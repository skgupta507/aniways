import { z } from "zod";

import { orm, schema } from "@aniways/db";
import { getAnimeList } from "@aniways/myanimelist";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const animeRouter = createTRPCRouter({
  all: publicProcedure
    .input(z.object({ page: z.number().default(1) }))
    .query(async ({ ctx, input }) => {
      const recentlyReleased = await ctx.db
        .select({
          id: schema.anime.id,
          title: schema.anime.title,
          image: schema.anime.image,
          lastEpisode: schema.anime.lastEpisode,
        })
        .from(schema.anime)
        .where(
          orm.and(
            orm.notLike(schema.anime.title, "%Dub%"),
            orm.notLike(schema.anime.title, "%dub%"),
            orm.isNotNull(schema.anime.lastEpisode),
          ),
        )
        .orderBy(orm.desc(schema.anime.updatedAt))
        .limit(21)
        .offset((input.page - 1) * 20);

      const hasNext = recentlyReleased.length > 20;

      if (hasNext) {
        recentlyReleased.pop();
      }

      return {
        recentlyReleased,
        hasNext,
      };
    }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [anime] = await ctx.db
        .select()
        .from(schema.anime)
        .where(orm.eq(schema.anime.id, input.id))
        .limit(1);

      return anime;
    }),

  byIdWithFirstEpisode: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [anime] = await ctx.db
        .select()
        .from(schema.anime)
        .where(orm.eq(schema.anime.id, input.id))
        .limit(1);

      if (!anime) return null;

      const [episodes] = await ctx.db
        .select({
          episode: schema.video.episode,
        })
        .from(schema.video)
        .where(orm.eq(schema.video.animeId, input.id))
        .orderBy(orm.asc(schema.video.episode))
        .limit(1);

      return { ...anime, firstEpisode: episodes?.episode ?? null };
    }),

  continueWatching: protectedProcedure.query(async ({ ctx }) => {
    const animeList = await getAnimeList(
      ctx.session.accessToken,
      ctx.session.user.name,
      1,
      50,
      "watching",
    );

    const currentlyWatchingAnime = await ctx.db
      .select({
        id: schema.anime.id,
        title: schema.anime.title,
        image: schema.anime.image,
        malAnimeId: schema.anime.malAnimeId,
        lastEpisode: schema.anime.lastEpisode,
      })
      .from(schema.anime)
      .where(
        orm.inArray(
          schema.anime.malAnimeId,
          animeList.data.map(({ node }) => node.id),
        ),
      );

    const animeListMap = animeList.data.reduce(
      (acc, { node }) => {
        acc[node.id] = node;
        return acc;
      },
      {} as Record<number, (typeof animeList)["data"][number]["node"]>,
    );

    return (
      currentlyWatchingAnime
        // embed last watched episode and last updated at
        .map((anime) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const { my_list_status } = animeListMap[anime.malAnimeId!]!;

          return {
            ...anime,
            lastWatchedEpisode: my_list_status?.num_episodes_watched,
            lastUpdatedAt: my_list_status?.updated_at,
          };
        })
        // filter out animes that have all episodes watched
        .filter((anime) => {
          const lastEpisodeReleased = Number(anime.lastEpisode);

          return anime.lastWatchedEpisode !== lastEpisodeReleased;
        })
        // transfrom last watched episode to next episode to watch
        .map((anime) => {
          const episodesWatched = anime.lastWatchedEpisode;

          const lastEpisode = String(
            episodesWatched !== undefined
              ? episodesWatched + 1
              : anime.lastEpisode,
          );

          return {
            ...anime,
            lastEpisode,
          };
        })
        // sort by last updated at
        .sort((a, b) => {
          if (!a.lastUpdatedAt || !b.lastUpdatedAt) return 0;

          return new Date(a.lastUpdatedAt) > new Date(b.lastUpdatedAt) ? -1 : 1;
        })
    );
  }),

  search: publicProcedure
    .input(z.object({ query: z.string(), page: z.number() }))
    .query(async ({ ctx, input }) => {
      const animes = await ctx.db
        .select({
          id: schema.anime.id,
          title: schema.anime.title,
          image: schema.anime.image,
          lastEpisode: schema.anime.lastEpisode,
        })
        .from(schema.anime)
        .where(
          orm.and(
            orm.sql`SIMILARITY(${schema.anime.title}, ${input.query}) > 0.2`,
            orm.notLike(schema.anime.title, "%Dub%"),
            orm.notLike(schema.anime.title, "%dub%"),
            orm.isNotNull(schema.anime.lastEpisode),
          ),
        )
        .orderBy(
          orm.sql`SIMILARITY(${schema.anime.title}, ${input.query}) DESC`,
        )
        .limit(21)
        .offset((input.page - 1) * 20);

      const hasNext = animes.length > 20;

      if (hasNext) {
        animes.pop();
      }

      return {
        animes,
        hasNext,
      };
    }),
});
