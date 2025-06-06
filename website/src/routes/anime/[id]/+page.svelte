<script lang="ts">
  import Metadata from '$lib/components/anime/metadata.svelte';
  import OtherAnimeSections from '$lib/components/anime/other-anime-sections.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import { Skeleton } from '$lib/components/ui/skeleton';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  let { anime, episodes, seasonsAndRelatedAnimes, banner, library } = $derived(data);

  let showAll = $state(false);
  let searchValue = $state('');

  let canShowAll = $derived.by(() => {
    if (searchValue) return filteredEpisodes.length > 12;
    return episodes.length > 12;
  });

  let filteredEpisodes = $derived.by(() => {
    return episodes.filter(
      (episode) =>
        episode.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
        episode.number.toString().includes(searchValue)
    );
  });

  let displayEpisodes = $derived.by(() => {
    if (showAll) return filteredEpisodes;
    return filteredEpisodes.slice(0, 12);
  });
</script>

<div id="anime-page">
  <div class="border-border sticky top-0 w-full overflow-hidden rounded-b-md">
    {#await banner}
      <Skeleton class="h-48 w-full md:h-96" />
    {:then banner}
      <img
        src={banner?.banner || anime.mainPicture || anime.poster}
        alt={`Banner for ${anime.jname}`}
        class="h-48 w-full overflow-hidden object-cover object-center md:h-96"
      />
      <div
        class="from-background via-background/70 to-background absolute left-0 top-0 h-full w-full bg-gradient-to-b"
      ></div>
    {/await}
  </div>

  <Metadata {anime} {library} />
</div>

<div class="flex w-full items-center justify-between px-3 pt-8 md:px-8">
  <h2 class="font-sora text-xl font-bold">Episodes</h2>
  <div class="flex items-center gap-2">
    <p class="font-sora text-muted-foreground hidden md:block">
      {episodes.length} episodes
    </p>
    <Input placeholder="Search episodes" class="w-48" bind:value={searchValue} />
  </div>
</div>

<div class="mx-3 mt-4 grid grid-cols-2 gap-4 pb-3 md:mx-8 md:grid-cols-2 md:pb-8 lg:grid-cols-3">
  {#each displayEpisodes as episode}
    <Button
      variant="outline"
      class="bg-card h-fit flex-col items-start rounded-md p-3"
      href="/anime/{anime.id}/watch?episode={episode.number}&key={episode.id}"
    >
      <p class="font-sora">
        Episode {episode.number}
      </p>
      <p class="text-muted-foreground w-full truncate text-xs md:text-inherit">
        {episode.title === `Episode ${episode.number}` ? 'No title available' : episode.title}
      </p>
    </Button>
  {/each}
</div>
{#if canShowAll}
  <div class="mb-3 px-3 md:mb-8 md:px-8">
    <Button variant="outline" onclick={() => (showAll = !showAll)} class="w-full">
      <p class="font-sora">
        {showAll ? 'Show less' : 'Show all'}
      </p>
    </Button>
  </div>
{/if}

<OtherAnimeSections animeId={anime.id} {seasonsAndRelatedAnimes} />
