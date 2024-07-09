"use client";

import { Skeleton } from "@aniways/ui/skeleton";

import ErrorPage from "~/app/error";
import { api } from "~/trpc/react";
import { AnimeMetadataDetails } from "./anime-metadata-details";
import { RelatedAnime } from "./related-anime";

export const AnimeMetadata = (props: { id: string; title: string }) => {
  const {
    data: metadata,
    isLoading,
    isError,
    error,
  } = api.myAnimeList.getAnimeMetadata.useQuery({ id: props.id });

  if (isLoading || !metadata) {
    return <Skeleton className="mb-6 h-[500px] w-full" />;
  }

  if (isError) {
    return <ErrorPage error={{ ...error, name: "error" }} />;
  }

  return (
    <>
      <h3 className="mb-3 mt-6 text-lg font-semibold">Anime Information</h3>
      <AnimeMetadataDetails title={props.title} metadata={metadata} />
      <RelatedAnime relatedAnime={metadata.relatedAnime} />
    </>
  );
};
