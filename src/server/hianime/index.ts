import { HiAnime } from "aniwatch";
import { z } from "zod";

const SYNC_URL = `https://raw.githubusercontent.com/bal-mackup/mal-backup/refs/heads/master/mal/anime`;
const BASE_URL = "https://hianime.to";

const SyncDataSchema = z.object({
  id: z.number(),
  Sites: z.object({
    Zoro: z.record(
      z.object({
        identifier: z.string(),
        url: z.string().url(),
      }),
    ),
  }),
});

export class HiAnimeScraper {
  private scraper: HiAnime.Scraper;

  constructor() {
    this.scraper = new HiAnime.Scraper();
  }

  async getHiAnimeIdFromMalId(malId: number) {
    const response = await fetch(`${SYNC_URL}/${malId}.json`)
      .then((res) => res.json())
      .then((data) => SyncDataSchema.parse(data))
      .catch(() => null);

    const url = Object.values(response?.Sites.Zoro ?? {})[0]?.url;

    const id = url?.split("/").pop();

    return id ?? null;
  }

  async getMalIdFromHiAnimeId(hiAnimeId: string) {
    return this.scraper
      .getInfo(hiAnimeId)
      .then((data) => data.anime.info.malId)
      .then((malId) => {
        if (!malId) throw new Error();
        return malId;
      })
      .catch(() => {
        throw new Error("No MAL ID found");
      });
  }

  async getRandomAnime() {
    const random = await fetch(`${BASE_URL}/random`, {
      redirect: "manual",
    }).then(async (res) => res.headers.get("Location"));

    const id = random?.split("/").pop();

    return id ?? null;
  }

  async search(query: string, page = 1) {
    return this.scraper.search(query, page);
  }

  async getInfo(id: string) {
    return this.scraper.getInfo(id);
  }

  async getEpisodes(id: string) {
    return this.scraper.getEpisodes(id);
  }

  async getEpisodeSrc(id: string, episode: number) {
    const { episodes } = await this.scraper.getEpisodes(id);

    const episodeId = episodes.find((ep) => ep.number === episode)?.episodeId;

    if (!episodeId) throw new Error("Episode not found");

    return this.scraper.getEpisodeSources(episodeId);
  }
}
