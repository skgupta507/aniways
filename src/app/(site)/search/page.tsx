import type { Metadata } from "next";
import { Suspense } from "react";
import { HeartCrack } from "lucide-react";

import { AnimeGridLoader } from "@/components/layouts/anime-grid-loader";
import { api } from "@/trpc/server";
import { AnimeGrid } from "@/components/layouts/anime-grid";
import { Pagination, PaginationLoader } from "@/components/pagination";
import { type RouterOutputs } from "@/trpc/react";
import { type SearchFilters } from "@/lib/hianime";

type SearchPageParams = {
  searchParams: Promise<
    { query: string; page: string } & Exclude<SearchFilters, "genres"> & {
        genres?: string;
      }
  >;
};

export const generateMetadata = async ({ searchParams }: SearchPageParams) => {
  const { query } = await searchParams;

  return {
    title: `${query} - Search`,
    description: `Search for ${query} on AniWays`,
  } satisfies Metadata;
};

const SearchPage = async ({ searchParams }: SearchPageParams) => {
  const { query, ...params } = await searchParams;
  const page = Math.max(Number(params.page || "1"));

  Object.entries(params).map(([key, value]) => {
    if (value === "all") delete params[key as keyof SearchFilters];
  });

  const searchResult = api.hiAnime.search({
    query,
    page,
    filters: {
      ...params,
      genres: params.genres?.split(",") as SearchFilters["genres"] | undefined,
    },
  });

  return (
    <>
      <div className="mb-6 flex w-full flex-col justify-between gap-3 md:mb-5 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Search</h1>
          <p className="text-muted-foreground">
            Showing results for <span className="text-foreground">{query}</span>
          </p>
        </div>
        <Suspense fallback={<PaginationLoader />}>
          <PaginationWrapper result={searchResult} />
        </Suspense>
      </div>
      <Suspense
        key={JSON.stringify({
          query,
          ...params,
        })}
        fallback={<AnimeGridLoader />}
      >
        <SearchResults result={searchResult} />
      </Suspense>
      <div className="mt-6">
        <Suspense fallback={<PaginationLoader />}>
          <PaginationWrapper result={searchResult} />
        </Suspense>
      </div>
    </>
  );
};

const SearchResults = async ({
  result,
}: {
  result: Promise<RouterOutputs["hiAnime"]["search"]>;
}) => {
  const { animes } = await result;

  if (!animes.length) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3 p-3">
        <HeartCrack className="text-primary" size={128} />
        <h2 className="text-3xl font-bold">Oops, no results found</h2>
        <p className="text-center text-muted-foreground">
          Sorry, we couldn&apos;t find any results matching your query.
        </p>
      </div>
    );
  }

  return (
    <AnimeGrid>
      {animes.map((anime) => (
        <AnimeGrid.Item
          key={anime.id}
          title={anime.jname ?? anime.name ?? "???"}
          subtitle={`${anime.episodes ?? "???"} episodes`}
          poster={anime.poster ?? ""}
          url={`/anime/${anime.id}`}
        />
      ))}
    </AnimeGrid>
  );
};

const PaginationWrapper = async ({
  result,
}: {
  result: Promise<RouterOutputs["hiAnime"]["search"]>;
}) => {
  const { hasNextPage, animes, currentPage } = await result;

  if (!animes.length) return null;

  if (!hasNextPage && currentPage === 1) return null;

  return <Pagination hasNext={hasNextPage} />;
};

export default SearchPage;
