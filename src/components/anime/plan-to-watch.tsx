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

type PlanToWatchProps = {
  initialData: RouterOutputs["mal"]["getPlanToWatch"];
};

export const PlanToWatch = (props: PlanToWatchProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = useMemo(() => {
    if (pathname !== "/plan-to-watch") return 1;
    const page = parseInt(searchParams.get("page") ?? "1");
    return isNaN(page) ? 1 : page;
  }, [searchParams, pathname]);

  const {
    data: { anime: planToWatchAnime, hasNext },
    isLoading,
    error,
  } = api.mal.getPlanToWatch.useQuery(
    { page },
    {
      initialData: props.initialData,
    },
  );

  if (isLoading) return <AnimeGridLoader />;

  if (error || !planToWatchAnime.length) return null;

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="mb-2 text-lg font-bold md:mb-5 md:text-2xl">
          Your Plan to Watch
        </h1>
        {pathname === "/plan-to-watch"
          ? hasNext && <Pagination hasNext={hasNext} />
          : planToWatchAnime.length > 6 && (
              <Button asChild variant={"link"} className="flex gap-2">
                <Link href="/plan-to-watch">
                  View All
                  <ArrowRight />
                </Link>
              </Button>
            )}
      </div>
      <AnimeGrid
        className={cn(
          "mb-6",
          pathname !== "/plan-to-watch" &&
            "flex flex-col md:grid md:grid-cols-6",
        )}
      >
        {planToWatchAnime
          ?.slice(
            0,
            pathname === "/plan-to-watch" ? planToWatchAnime.length : 6,
          )
          .map((anime) => (
            <AnimeCard
              key={anime.animeId}
              poster={anime.malAnime.node.main_picture.large ?? ""}
              title={anime.malAnime.node.title ?? "???"}
              subtitle={`Episode ${anime.lastWatchedEpisode + 1}`}
              url={`/anime/${anime.animeId}?episode=${anime.lastWatchedEpisode + 1}`}
              type={pathname === "/plan-to-watch" ? "vertical" : "horizontal"}
            />
          ))}
      </AnimeGrid>
      {pathname === "/plan-to-watch"
        ? hasNext && <Pagination hasNext={hasNext} />
        : null}
    </>
  );
};
