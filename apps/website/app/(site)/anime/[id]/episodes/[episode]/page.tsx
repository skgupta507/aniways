import { createAnimeService } from '@aniways/data';
import { Skeleton } from '@aniways/ui/components/ui/skeleton';
import { Metadata } from 'next';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { notFound } from 'next/navigation';
import { Suspense, cache } from 'react';
import ErrorPage from '../../../../../error';
import { EpisodesSection } from './_episodes';
import { VideoFrame } from './video-frame';
import { AnimeMetadata } from './_metadata';

const getAnimeById = cache(async (id: string) => {
  const service = createAnimeService();

  return await service.getAnimeById(id);
});

export const generateMetadata = async ({
  params: { id, episode },
}: {
  params: {
    id: string;
    episode: string;
  };
}): Promise<Metadata> => {
  episode = episode.replace('-', '.');

  const data = await getAnimeById(id);

  if (!data || !data.title) return {};

  return {
    title: `${data.title} - Episode ${episode}`,
    description: `Watch ${data.title} episode ${episode} online for free.`,
    openGraph: {
      title: `${data.title} - Episode ${episode}`,
      description: `Watch ${data.title} episode ${episode} online for free.`,
      type: 'video.episode',
      siteName: 'Aniways',
      images: [
        {
          url: data.image,
          alt: `${data.title} - Episode ${episode}`,
        },
      ],
    },
  };
};

const AnimeStreamingPage = async ({
  params: { id, episode },
}: {
  params: {
    id: string;
    episode: string;
  };
}) => {
  episode = episode.replace('-', '.');

  const anime = await getAnimeById(id);

  if (!anime) notFound();

  return (
    <>
      <div className="mb-3">
        <h1 className="text-xl font-bold">{anime.title}</h1>
        <h2 className="text-muted-foreground text-lg font-normal">
          Episode {episode}
        </h2>
      </div>
      <div className="mb-5 flex aspect-video w-full flex-col gap-2">
        <div className="flex-1">
          <Suspense
            fallback={
              <Skeleton className="min-h-[260px] w-full md:aspect-video md:min-h-0" />
            }
          >
            <VideoFrame animeId={id} currentEpisode={episode} />
          </Suspense>
        </div>
        <Suspense
          fallback={
            <>
              <Skeleton className="mb-6 mt-3 h-10 w-full" />
              <h2 className="mb-3 text-lg font-semibold">Episodes</h2>
              <Skeleton className="mb-6 h-10 w-full" />
            </>
          }
        >
          <EpisodesSection animeId={id} currentEpisode={episode} />
        </Suspense>
      </div>
      <ErrorBoundary errorComponent={ErrorPage}>
        <Suspense fallback={<Skeleton className="mb-6 h-[500px] w-full" />}>
          <AnimeMetadata id={id} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default AnimeStreamingPage;
