package xyz.aniways.features.library.daos

import org.ktorm.dsl.*
import org.ktorm.entity.*
import org.ktorm.schema.timestamp
import xyz.aniways.database.AniwaysDatabase
import xyz.aniways.features.anime.db.Anime
import xyz.aniways.features.anime.db.AnimeTable
import xyz.aniways.features.library.db.LibraryEntity
import xyz.aniways.features.library.db.LibraryStatus
import xyz.aniways.features.library.db.LibraryTable
import xyz.aniways.features.library.db.library
import xyz.aniways.models.PageInfo
import xyz.aniways.models.Pagination

interface LibraryDao {
    suspend fun getLibraryAnime(
        userId: String,
        animeId: String
    ): LibraryEntity?

    suspend fun getLibrary(
        userId: String,
        page: Int,
        itemsPerPage: Int,
        status: LibraryStatus
    ): Pagination<LibraryEntity>

    suspend fun saveToLibrary(userId: String, animeId: String, status: LibraryStatus, epNo: Int? = null)
    suspend fun deleteFromLibrary(userId: String, animeId: String)
}

class DBLibraryDao(
    private val db: AniwaysDatabase
) : LibraryDao {
    override suspend fun getLibraryAnime(userId: String, animeId: String): LibraryEntity? {
        return db.query {
            library.find { (it.userId eq userId) and (it.animeId eq animeId) }
        }
    }

    override suspend fun getLibrary(
        userId: String,
        page: Int,
        itemsPerPage: Int,
        status: LibraryStatus
    ): Pagination<LibraryEntity> {
        return db.query {
            if (status == LibraryStatus.ALL) {
                val totalItems = library.count { it.userId eq userId }
                val items = from(LibraryTable)
                    .leftJoin(AnimeTable, on = AnimeTable.id eq LibraryTable.animeId)
                    .select()
                    .where { LibraryTable.userId eq userId }
                    .orderBy(AnimeTable.jname.asc())
                    .limit(offset = (page - 1) * itemsPerPage, limit = itemsPerPage)
                    .map { row ->
                        LibraryTable.createEntity(row, withReferences = true)
                    }
                    .toList()

                Pagination(
                    items = items,
                    pageInfo = PageInfo(
                        hasNextPage = totalItems > page * itemsPerPage,
                        totalPage = totalItems / itemsPerPage + 1,
                        currentPage = page,
                        hasPreviousPage = page > 1,
                    )
                )
            } else {
                val totalItems = library.count { (it.userId eq userId) and (it.status eq status) }
                val items = from(LibraryTable)
                    .leftJoin(AnimeTable, on = AnimeTable.id eq LibraryTable.animeId)
                    .select()
                    .where { (LibraryTable.userId eq userId) and (LibraryTable.status eq status) }
                    .orderBy(AnimeTable.jname.asc())
                    .limit(offset = (page - 1) * itemsPerPage, limit = itemsPerPage)
                    .map { row ->
                        LibraryTable.createEntity(row, withReferences = true)
                    }
                    .toList()

                Pagination(
                    items = items,
                    pageInfo = PageInfo(
                        hasNextPage = totalItems > page * itemsPerPage,
                        totalPage = totalItems / itemsPerPage + 1,
                        currentPage = page,
                        hasPreviousPage = page > 1,
                    )
                )
            }
        }
    }

    override suspend fun saveToLibrary(userId: String, animeId: String, status: LibraryStatus, epNo: Int?) {
        db.query {
            val alreadyInDB = library.find { (it.userId eq userId) and (it.animeId eq animeId) }

            if (alreadyInDB != null) {
                update(LibraryTable) { row ->
                    set(row.status, status)
                    set(row.watchedEpisodes, epNo ?: 0)
                    where {
                        (row.userId eq userId) and (row.animeId eq animeId)
                    }
                }
                return@query
            }

            insert(LibraryTable) {
                set(it.animeId, animeId)
                set(it.userId, userId)
                set(it.status, status)
                set(it.watchedEpisodes, epNo ?: 0)
            }
        }
    }

    override suspend fun deleteFromLibrary(userId: String, animeId: String) {
        db.query {
            library.find { (it.userId eq userId) and (it.animeId eq animeId) }?.delete()
        }
    }
}