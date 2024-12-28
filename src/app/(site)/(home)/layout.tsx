import { ContinueWatching as ContinueWatchingClient } from "@/components/anime/continue-watching";
import { PlanToWatch as PlanToWatchClient } from "@/components/anime/plan-to-watch";
import { TrendingAnime as TrendingAnimeClient } from "@/components/anime/trending-anime";
import { AnimeCarousel as AnimeCarouselClient } from "@/components/anime/seasonal-anime-carousel";
import { AnimeGridLoader } from "@/components/layouts/anime-grid-loader";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/server";
import { Suspense, type ReactNode } from "react";

type HomeLayoutProps = {
  children: ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <>
      <Suspense
        fallback={
          <div className="mb-6 flex w-full flex-col-reverse gap-3 md:grid md:grid-cols-5 md:gap-6">
            <div className="col-span-2 hidden select-none flex-col justify-center md:flex">
              <Skeleton className="mb-2 line-clamp-3 h-6 w-1/2 text-2xl font-bold md:mb-5 md:h-12 md:text-5xl" />
              <Skeleton className="mb-3 flex h-10 w-3/4 gap-2" />
              <Skeleton className="mb-2 line-clamp-3 h-16 w-full text-sm text-muted-foreground md:mb-5" />
              <Skeleton className="flex h-10 w-36 items-center gap-2" />
            </div>
            <Skeleton className="relative col-span-3 aspect-video w-full overflow-hidden rounded-md p-3" />
          </div>
        }
      >
        <AnimeCarousel />
      </Suspense>
      <Suspense
        fallback={
          <>
            <Skeleton className="mb-2 h-7 w-60 font-bold md:mb-5 md:h-8" />
            <div className="mb-6">
              <AnimeGridLoader length={6} />
            </div>
          </>
        }
      >
        <TrendingAnime />
      </Suspense>
      <Suspense
        fallback={
          <>
            <Skeleton className="mb-2 h-7 w-60 font-bold md:mb-5 md:h-8" />
            <div className="mb-6">
              <AnimeGridLoader length={6} />
            </div>
          </>
        }
      >
        <ContinueWatching />
      </Suspense>
      <Suspense
        fallback={
          <>
            <Skeleton className="mb-2 h-7 w-60 font-bold md:mb-5 md:h-8" />
            <div className="mb-6">
              <AnimeGridLoader length={6} />
            </div>
          </>
        }
      >
        <PlanToWatch />
      </Suspense>
      {children}
    </>
  );
};

const AnimeCarousel = async () => {
  const seasonalAnime = await api.mal.getCurrentSeasonalAnime();

  return <AnimeCarouselClient seasonalAnime={seasonalAnime.slice(0, 10)} />;
};

const TrendingAnime = async () => {
  const trendingAnime = await api.hiAnime.getTrendingAnime();

  return <TrendingAnimeClient trendingAnime={trendingAnime} />;
};

const ContinueWatching = async () => {
  const initalData = await api.mal
    .getContinueWatching({ page: 1 })
    .catch(() => null);

  if (!initalData) return null;

  return <ContinueWatchingClient initialData={initalData} />;
};

const PlanToWatch = async () => {
  const initalData = await api.mal
    .getPlanToWatch({ page: 1 })
    .catch(() => null);

  if (!initalData) return null;

  return <PlanToWatchClient initialData={initalData} />;
};

export default HomeLayout;
