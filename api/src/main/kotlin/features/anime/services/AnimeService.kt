package xyz.aniways.features.anime.services

import io.ktor.util.logging.*
import kotlinx.coroutines.*
import kotlinx.coroutines.sync.Semaphore
import kotlinx.coroutines.sync.withPermit
import xyz.aniways.features.anime.api.anilist.AnilistApi
import xyz.aniways.features.anime.api.anilist.models.AnilistAnime
import xyz.aniways.features.anime.api.anilist.models.AnilistAnimeDto
import xyz.aniways.features.anime.dao.AnimeDao
import xyz.aniways.features.anime.db.Anime
import xyz.aniways.features.anime.dtos.*
import xyz.aniways.features.anime.scrapers.AnimeScraper
import xyz.aniways.models.Pagination
import xyz.aniways.utils.retryWithDelay
import java.time.Instant

class AnimeService(
    private val animeScraper: AnimeScraper,
    private val animeDao: AnimeDao,
    private val anilistApi: AnilistApi
) {
    private val logger = KtorSimpleLogger("AnimeService")

    suspend fun getTrendingAnimes(): List<AnimeDto> {
        val trendingAnimes = anilistApi.getTrendingAnime()
        val dbAnimes = animeDao.getAnimesInMalIds(trendingAnimes.mapNotNull { it.malId })

        return trendingAnimes.mapNotNull { scrapedAnime ->
            dbAnimes.find { it.malId == scrapedAnime.malId }?.toAnimeDto()
        }
    }

    suspend fun getSeasonalAnimes(): List<AnilistAnimeDto> {
        return transformToAnilistAnimeDto(anilistApi.getSeasonalAnime())
    }

    suspend fun getPopularAnimes(): List<AnilistAnimeDto> {
        return transformToAnilistAnimeDto(anilistApi.getAllTimePopularAnime())
    }

    suspend fun getRecentlyUpdatedAnimes(page: Int, itemsPerPage: Int): Pagination<AnimeDto> {
        val result = animeDao.getRecentlyUpdatedAnimes(page, itemsPerPage)
        return Pagination(result.pageInfo, result.items.map { it.toAnimeDto() })
    }

    suspend fun searchAnime(query: String, page: Int): Pagination<AnimeDto> {
        val result = animeScraper.searchAnime(query, page)
        val dbAnimes = animeDao.getAnimesInHiAnimeIds(result.items.map { it.hianimeId })

        return Pagination(result.pageInfo, dbAnimes.map { it.toAnimeDto() })
    }

    suspend fun getAnimeCount(): Int {
        return animeDao.getAnimeCount()
    }

    suspend fun scrapeTopAnimes(): TopAnimeDto {
        return animeScraper.getTopAnimes()
    }

    suspend fun scrapeAndPopulateAnime(page: Int = 1): Unit = coroutineScope {
        logger.info("Scraping and populating anime for page $page")
        val animes = animeScraper.getAZList(page)
        val semaphore = Semaphore(10)

        val deferredAnimeInfo = animes.items.map { anime ->
            async {
                semaphore.withPermit {
                    logger.info("Fetching anime info for ${anime.hianimeId}")
                    val animeInfo = retryWithDelay {
                        animeScraper.getAnimeInfo(anime.hianimeId)
                    }

                    animeInfo ?: return@async null

                    Anime {
                        name = animeInfo.name
                        jname = animeInfo.jname
                        poster = animeInfo.poster
                        genre = animeInfo.genre
                        hianimeId = anime.hianimeId
                        malId = animeInfo.malId
                        anilistId = animeInfo.anilistId
                        lastEpisode = animeInfo.lastEpisode
                    }
                }
            }
        }

        val animeInfo = deferredAnimeInfo.awaitAll().filterNotNull()
        animeDao.insertAnimes(animeInfo)
        logger.info("Inserted ${animeInfo.size} animes")

        if (!animes.pageInfo.hasNextPage) return@coroutineScope

        delay(1000L)
        scrapeAndPopulateAnime(page + 1)
    }

    suspend fun scrapeAndPopulateNewAnime(): Unit = coroutineScope {
        var page = 1
        val newAnimes = mutableListOf<Anime>()

        while (isActive) {
            val animes = animeScraper.getAZList(page)

            val inDB = animeDao.getAnimesInHiAnimeIds(animes.items.map { it.hianimeId })

            animes.items
                .filter { anime -> inDB.none { it.hianimeId == anime.hianimeId } }
                .forEach { scrapedAnime ->
                    val info = retryWithDelay {
                        animeScraper.getAnimeInfo(scrapedAnime.hianimeId)
                    }

                    newAnimes.add(Anime {
                        name = scrapedAnime.name
                        jname = scrapedAnime.jname
                        poster = scrapedAnime.poster
                        genre = info?.genre ?: ""
                        hianimeId = scrapedAnime.hianimeId
                        malId = info?.malId
                        anilistId = info?.anilistId
                        lastEpisode = info?.lastEpisode
                    })
                }

            if (!animes.pageInfo.hasNextPage) break

            page++
            delay(1000L)
        }

        animeDao.insertAnimes(newAnimes)
        logger.info("Inserted ${newAnimes.size} new animes")
    }

    /*
    * Scrapes from behind so page 210, 209, 208, ... 1 etc
    * */
    suspend fun scrapeAndPopulateRecentlyUpdatedAnime(fromPage: Int? = null): Unit = coroutineScope {
        if (fromPage == 0) {
            logger.info("Scraping and populating recently updated anime completed")
            return@coroutineScope
        }

        val page = fromPage ?: animeScraper.getRecentlyUpdatedAnime(1).pageInfo.totalPage

        logger.info("Scraping and populating recently updated anime for page $page")

        val animes = animeScraper.getRecentlyUpdatedAnime(page)

        val inDB = animeDao.getAnimesInHiAnimeIds(animes.items.map { it.hianimeId })


        // do synchronously to avoid rate limiting + better updatetime spread
        animes.items.reversed().forEach { scrapedAnime ->
            val dbAnime = inDB.find { it.hianimeId == scrapedAnime.hianimeId }

            logger.info("Fetching anime info for ${scrapedAnime.hianimeId}")
            val info = retryWithDelay {
                animeScraper.getAnimeInfo(scrapedAnime.hianimeId)
            }

            if (dbAnime != null) {
                animeDao.updateAnime(dbAnime.copy().apply {
                    poster = scrapedAnime.poster
                    lastEpisode = scrapedAnime.episodes?.toIntOrNull() ?: dbAnime.lastEpisode
                    malId = info?.malId ?: dbAnime.malId
                    anilistId = info?.anilistId ?: dbAnime.anilistId
                    updatedAt = Instant.now()
                })

                delay(200L)
                return@forEach
            }

            animeDao.insertAnime(Anime {
                name = scrapedAnime.name
                jname = scrapedAnime.jname
                poster = scrapedAnime.poster
                genre = info?.genre ?: ""
                hianimeId = scrapedAnime.hianimeId
                malId = info?.malId
                anilistId = info?.anilistId
                lastEpisode = scrapedAnime.episodes?.toIntOrNull()
            })

            delay(200L)
        }

        delay(1000L)
        scrapeAndPopulateRecentlyUpdatedAnime(page - 1)
    }

    private suspend fun transformToAnilistAnimeDto(animes: List<AnilistAnime>): List<AnilistAnimeDto> {
        val dbAnimes = animeDao.getAnimesInMalIds(animes.mapNotNull { it.malId })

        return animes.mapNotNull { anilistAnime ->
            dbAnimes.find { it.malId == anilistAnime.malId }?.let { dbAnime ->
                AnilistAnimeDto(
                    id = dbAnime.id.toString(),
                    title = anilistAnime.title,
                    bannerImage = anilistAnime.bannerImage,
                    coverImage = anilistAnime.coverImage,
                    description = anilistAnime.description,
                    startDate = anilistAnime.startDate,
                    type = anilistAnime.type,
                    episodes = anilistAnime.episodes,
                    anime = dbAnime.toAnimeDto()
                )
            }
        }
    }
}
