<script lang="ts">
  import AnimeGrid from '$lib/components/anime/anime-grid.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<div class="m-3 mt-20 md:m-8 md:mt-20">
  <h1 class="font-sora text-2xl font-bold">Continue Watching</h1>
  <AnimeGrid
    pageInfo={data.continueWatching.pageInfo}
    buildUrl={(anime) => `/anime/${anime.id}/watch?episode=${anime.lastEpisode}`}
    buildSubtitle={(anime) => `Episode ${anime.lastEpisode}`}
    animes={data.continueWatching.items.map((lib) => ({
      ...lib.anime,
      lastEpisode: lib.watchedEpisodes + 1
    }))}
  />
</div>
