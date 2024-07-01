import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createId, orm, schema } from "@aniways/db";
import {
  getStreamingUrl,
  scrapeAllEpisodes,
  scrapeVideoSource,
} from "@aniways/web-scraping";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const episodesRouter = createTRPCRouter({
  scrapeVideoUrl: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return await scrapeVideoSource(input.slug);
    }),

  updateVideoUrl: publicProcedure
    .input(
      z.object({
        id: z.string(),
        videoUrl: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(schema.video)
        .set({
          videoUrl: input.videoUrl,
        })
        .where(orm.eq(schema.video.id, input.id));
    }),

  seedMissingEpisodes: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [anime] = await ctx.db
        .select()
        .from(schema.anime)
        .where(orm.eq(schema.anime.id, input.id))
        .limit(1);

      if (!anime) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Anime not found",
        });
      }

      const { episodes, animeSlug } = await scrapeAllEpisodes(anime.slug);

      if (!episodes.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No episodes found for this anime",
        });
      }

      await ctx.db
        .update(schema.anime)
        .set({
          slug: animeSlug,
          lastEpisode: String(
            episodes.sort((a, b) => a.episode - b.episode).pop()?.episode
          ),
        })
        .where(orm.eq(schema.anime.id, anime.id));

      await ctx.db.insert(schema.video).values(
        episodes.map(({ episode, episodeSlug }) => ({
          id: createId(),
          animeId: anime.id,
          slug: episodeSlug,
          episode: String(episode),
        }))
      );

      return episodes.sort((a, b) => a.episode - b.episode).at(0)?.episode;
    }),

  getEpisodesOfAnime: publicProcedure
    .input(z.object({ animeId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .selectDistinctOn([schema.video.episode])
        .from(schema.video)
        .where(orm.eq(schema.video.animeId, input.animeId))
        .orderBy(orm.asc(schema.video.episode));
    }),

  getEpisodeByAnimeIdAndEpisode: publicProcedure
    .input(
      z.object({
        animeId: z.string(),
        episode: z.coerce.number().transform(e => String(e)),
      })
    )
    .query(async ({ ctx, input }) => {
      const [video] = await ctx.db
        .select()
        .from(schema.video)
        .where(
          orm.and(
            orm.eq(schema.video.animeId, input.animeId),
            orm.eq(schema.video.episode, input.episode)
          )
        );

      return video;
    }),

  getFirstEpisodeByAnimeId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [video] = await ctx.db
        .select({
          episode: schema.video.episode,
        })
        .from(schema.video)
        .where(orm.eq(schema.video.animeId, input.id))
        .orderBy(orm.asc(schema.video.episode))
        .limit(1);

      return {
        episode: video?.episode,
      };
    }),

  getStreamingSources: publicProcedure
    .input(z.object({ episodeSlug: z.string() }))
    .query(({ input }) => getStreamingUrl(input.episodeSlug)),
});
