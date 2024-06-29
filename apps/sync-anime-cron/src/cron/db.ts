import { createId, db, orm, schema } from "@aniways/db";

import type { RecentlyReleasedAnime } from "./scrape";
import { createLogger } from "../utils/logger";

const logger = createLogger("AniwaysSyncAnimeCron", "db");

const constructVideoInsertValues = (
  animeId: string,
  lastEpisode: string | undefined,
  newAnime: RecentlyReleasedAnime
) => {
  const lastEpisodeSaved = Number(lastEpisode ?? "0");
  const numberOfEpisodesToInsert = newAnime.episode - lastEpisodeSaved;

  const episodes = Array.from({ length: numberOfEpisodesToInsert })
    .map((_, i) => newAnime.episode - i)
    .reverse();

  episodes.pop(); // Remove the last episode

  const createdAt = new Date();

  return [
    ...episodes.map(ep => ({
      id: createId(),
      animeId,
      episode: String(ep),
      slug:
        newAnime.episodeSlug
          .trim()
          .split("-episode-")
          .slice(0, -1)
          .join("-episode-") + `-episode-${ep}`,
      createdAt,
    })),
    {
      id: createId(),
      animeId,
      episode: String(newAnime.episode),
      slug: newAnime.episodeSlug,
      createdAt,
    },
  ];
};

const processNewAnime = async (newAnime: RecentlyReleasedAnime) => {
  const [anime] = await db
    .select({
      id: schema.anime.id,
      lastEpisode: schema.anime.lastEpisode,
    })
    .from(schema.anime)
    .where(orm.eq(schema.anime.slug, newAnime.animeSlug));

  const animeId = anime?.id ?? createId();

  return await db.transaction(async tx => {
    if (!anime) {
      await tx.insert(schema.anime).values({
        id: animeId,
        title: newAnime.name,
        image: newAnime.image,
        slug: newAnime.animeSlug,
        lastEpisode: String(newAnime.episode),
        updatedAt: new Date(),
      });

      logger.log("Inserted new anime", newAnime.name, "into db");
    }

    await tx
      .update(schema.anime)
      .set({
        lastEpisode: String(newAnime.episode),
        updatedAt: new Date(),
      })
      .where(orm.eq(schema.anime.id, animeId));

    const episodes = constructVideoInsertValues(
      animeId,
      anime?.lastEpisode ?? undefined,
      newAnime
    );

    if (episodes.length === 0) {
      logger.error("No new episodes to insert for", newAnime.name);
      tx.rollback();
      return;
    }

    await tx.insert(schema.video).values(episodes);

    const [lastEpisode] = await tx
      .select()
      .from(schema.video)
      .where(
        orm.and(
          orm.eq(schema.video.animeId, animeId),
          orm.eq(schema.video.episode, String(newAnime.episode))
        )
      );

    if (lastEpisode) return episodes.length;

    logger.error(
      "Failed to insert episodes for anime",
      newAnime.name,
      "episode",
      newAnime.episode
    );

    tx.rollback();
  });
};

export const insertAnimesToDb = async (newAnimes: RecentlyReleasedAnime[]) => {
  const insertedAnimes = (await Promise.all(newAnimes.map(processNewAnime)))
    .flat()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .reduce((acc, b) => acc! + (b ?? 0), 0);

  if (insertedAnimes === 0) {
    logger.error("No episodes were inserted into db");
  }

  return insertedAnimes;
};
