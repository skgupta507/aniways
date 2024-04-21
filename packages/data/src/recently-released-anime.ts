import { db } from '@aniways/database';

export async function getRecentlyReleasedAnime(page: number) {
  const recentlyReleased = await db.query.anime.findMany({
    where: ({ title, lastEpisode }, { notLike, and, isNotNull }) => {
      return and(
        isNotNull(lastEpisode),
        notLike(title, `%dub%`),
        notLike(title, '%Dub%')
      );
    },
    orderBy: ({ updatedAt }, { desc }) => desc(updatedAt),
    offset: (page - 1) * 20,
    limit: 21,
    with: {
      videos: true,
    },
  });

  const hasNext = recentlyReleased.length > 20;

  if (hasNext) {
    recentlyReleased.pop();
  }

  return {
    recentlyReleased,
    hasNext,
  };
}
