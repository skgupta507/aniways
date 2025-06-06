import { getContinueWatchingAnime } from '$lib/api/library';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
  const page = Number(url.searchParams.get('page') || 1);
  const continueWatching = await getContinueWatchingAnime(fetch, page, 30);

  return {
    continueWatching
  };
};
