<script lang="ts">
  import type { getSeasonsAndRelatedAnimes } from '$lib/api/anime';
  import { Skeleton } from '$lib/components/ui/skeleton';
  import { cn } from '$lib/utils';

  type Props = {
    animeId: string;
    seasonsAndRelatedAnimes: ReturnType<typeof getSeasonsAndRelatedAnimes>;
  };

  let { animeId, seasonsAndRelatedAnimes }: Props = $props();
</script>

{#await seasonsAndRelatedAnimes}
  <div class="px-3 md:px-8">
    <h2 class="font-sora text-xl font-bold">Seasons</h2>
    <Skeleton class="mb-3 mt-3 h-20 w-full md:mb-8" />
    <h2 class="font-sora text-xl font-bold">Related Anime</h2>
    <Skeleton class="mb-3 mt-3 h-20 w-full md:mb-8" />
  </div>
{:then sections}
  {#each sections as sec}
    <h2 class={'font-sora mx-3 mt-6 text-xl font-bold first-of-type:mt-3 md:mx-8'}>
      {sec.label}
    </h2>

    <div
      class="mx-3 mb-3 mt-3 grid grid-cols-1 gap-4 md:mx-8 md:mb-8 md:grid-cols-2 lg:grid-cols-3"
    >
      {#each sec.value as data}
        <a
          href="/anime/{data.id}"
          class={cn(
            'group relative overflow-hidden rounded-md border-2',
            animeId === data.id && 'border-primary'
          )}
        >
          <img
            src={data.metadata?.mainPicture || data.poster}
            alt={data.jname}
            loading="lazy"
            class="absolute left-0 top-0 h-full w-full scale-110 object-cover object-center transition group-hover:scale-100"
          />
          <div class="bg-background relative z-10 h-full bg-opacity-80 p-3">
            <p class="font-sora line-clamp-1 text-lg font-bold">{data.jname}</p>
            <p class="text-muted-foreground line-clamp-1">{data.name}</p>
            <p class="text-muted-foreground mt-2 text-sm">{data.lastEpisode} Episodes</p>
          </div>
        </a>
      {/each}
    </div>
  {/each}
{:catch}
  <div
    class="bg-card font-sora text-destructive mx-3 rounded-md p-3 text-center text-xl font-bold md:mx-8"
  >
    Oops! There was an error fetching the data. Please try again later.
  </div>
{/await}
