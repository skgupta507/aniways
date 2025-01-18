"use client";

import { useCallback, useRef } from "react";
import { Loader2, Shell } from "lucide-react";

import type { RouterInputs } from "@/trpc/react";
import { Button } from "@/components/ui/button";

import { api } from "@/trpc/react";
import { AnimeGridLoader } from "../layouts/anime-grid-loader";
import { AnimeGrid } from "../layouts/anime-grid";

type Status = RouterInputs["mal"]["getAnimeListOfUser"]["status"];

interface AnimeListClientProps {
  status: Status;
}

function convertStatus(status: Status) {
  return status
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize first letter of each word
}

export const MalClient = ({ status }: AnimeListClientProps) => {
  const [animeList, { isFetching, hasNextPage, fetchNextPage }] =
    api.mal.getAnimeListOfUser.useSuspenseInfiniteQuery(
      {
        status,
      },
      {
        getNextPageParam: (lastPage, pages) =>
          lastPage.hasNext ? pages.length + 1 : undefined,
      },
    );

  const observerRef = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLLIElement) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetching) {
          void fetchNextPage();
        }
      });

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (node) observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching],
  );

  if (!animeList) {
    return <AnimeGridLoader />;
  }

  if (!animeList.pages[0]?.anime.length) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3 p-3">
        <Shell className="text-primary" size={128} />
        <h2 className="text-3xl font-bold">No Anime {convertStatus(status)}</h2>
        <p className="text-center text-muted-foreground">
          There are no anime in your list with the status{" "}
          <span className="text-foreground">{convertStatus(status)}</span>. Try
          changing the status or adding some anime to your list.
        </p>
      </div>
    );
  }

  return (
    <AnimeGrid>
      {animeList.pages.map((page) =>
        page.anime.map((anime) => (
          <AnimeGrid.Item
            key={anime.id}
            ref={lastElementRef}
            title={anime.title}
            poster={anime.main_picture.large}
            url={
              anime.hiAnimeId
                ? `/anime/${anime.hiAnimeId}`
                : `/search?query=${anime.title}`
            }
            subtitle={
              <div className="flex w-full justify-between">
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                  {convertStatus(
                    anime.my_list_status?.status ?? "plan_to_watch",
                  )}
                </p>
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                  {anime.my_list_status?.num_episodes_watched ?? 0} of{" "}
                  {anime.num_episodes || "???"}ep
                </p>
              </div>
            }
          />
        )),
      )}
      {hasNextPage && (
        <li className="col-span-2 flex items-center justify-center md:col-span-6">
          <Button
            onClick={() => !isFetching && fetchNextPage()}
            variant={"ghost"}
            disabled={isFetching}
          >
            {isFetching ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span className="ml-2">Loading...</span>
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </li>
      )}
    </AnimeGrid>
  );
};
