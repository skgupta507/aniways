"use client";

import { api, type RouterOutputs } from "@/trpc/react";
import { AnimeGridLoader } from "../layouts/anime-grid-loader";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Pagination } from "../pagination";
import { cn } from "@/lib/utils";
import { AnimeGrid } from "../layouts/anime-grid";
import { AnimeCard } from "../layouts/anime-card";

type ContinueWatchingProps = {
  initialData: RouterOutputs["mal"]["getContinueWatching"];
};

export const ContinueWatching = (props: ContinueWatchingProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = useMemo(() => {
    if (pathname !== "/watching") return 1;
    const page = parseInt(searchParams.get("page") ?? "1");
    return isNaN(page) ? 1 : page;
  }, [searchParams, pathname]);

  const {
    data: { anime: continueWatchingAnime, hasNext },
    isLoading,
    error,
  } = api.mal.getContinueWatching.useQuery(
    { page },
    {
      initialData: props.initialData,
    },
  );

  if (isLoading) return <AnimeGridLoader />;

  if (error || !continueWatchingAnime.length) return null;

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="mb-2 text-lg font-bold md:mb-5 md:text-2xl">
          Continue Watching
        </h1>
        {pathname === "/watching"
          ? hasNext && <Pagination hasNext={hasNext} />
          : continueWatchingAnime.length > 6 && (
              <Button asChild variant={"link"} className="flex gap-2">
                <Link href="/watching">
                  View All
                  <ArrowRight />
                </Link>
              </Button>
            )}
      </div>
      <AnimeGrid
        className={cn(
          "mb-6",
          pathname !== "/watching" && "flex flex-col md:grid md:grid-cols-6",
        )}
      >
        {continueWatchingAnime
          ?.slice(
            0,
            pathname === "/watching" ? continueWatchingAnime.length : 6,
          )
          .map((anime) => (
            <AnimeCard
              key={anime.malAnime.node.id}
              poster={anime.malAnime.node.main_picture.large ?? ""}
              title={anime.malAnime.node.title ?? "???"}
              url={`/anime/${anime.animeId}?episode=${anime.lastWatchedEpisode + 1}`}
              subtitle={`Episode ${anime.lastWatchedEpisode + 1}`}
              type={pathname === "/watching" ? "vertical" : "horizontal"}
            />
          ))}
      </AnimeGrid>
      {pathname === "/watching"
        ? hasNext && <Pagination hasNext={hasNext} />
        : null}
    </>
  );
};
