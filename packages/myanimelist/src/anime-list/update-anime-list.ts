import { MALClient, WatchStatus } from '@animelist/client';

export default async function updateAnimeList(
  accessToken: string,
  malId: number,
  status: WatchStatus,
  numWatchedEpisodes: number,
  score: number
) {
  const client = new MALClient({ accessToken });

  const anime = await client.updateMyAnimeListStatus(malId, {
    status,
    num_watched_episodes: numWatchedEpisodes,
    score,
  });

  return anime;
}
