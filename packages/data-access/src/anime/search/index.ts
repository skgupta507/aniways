import searchAnimeFromAnitaku from './anitaku';
import searchAnimeFromGogo from './gogoanime';
import searchAnimeFromJikan from './jikan';

export default async function searchAnime(query: string, page: number) {
  const functions = [
    {
      fn: searchAnimeFromAnitaku,
      name: 'Anitaku',
    },
    {
      fn: searchAnimeFromGogo,
      name: 'GogoAnime',
    },
    {
      fn: searchAnimeFromJikan,
      name: 'Jikan',
    },
  ] as const;

  // fetch anime
  // if fails or takes more than 2 seconds, move to the next one
  const getAnime = async (
    query: string,
    page: number,
    name: (typeof functions)[number]['name'],
    index: number,
    fn: (typeof functions)[number]['fn']
  ): Promise<{
    animes: Awaited<ReturnType<typeof searchAnimeFromAnitaku>>;
    hasNext: boolean;
  }> => {
    try {
      let done = false;
      new Promise((_, reject) => {
        setTimeout(() => {
          if (!done) reject('Timeout');
        }, 10000);
      });
      const anime = await fn(query, page);
      if (name === 'Jikan') {
        done = true;
        console.log(`Fetched search ${name} anime`);
        return anime as Awaited<ReturnType<typeof searchAnimeFromJikan>>;
      }
      return {
        animes: anime as Awaited<ReturnType<typeof searchAnimeFromAnitaku>>,
        hasNext: await fn(query, page + 1).then(res => {
          done = true;
          console.log(`Fetched search ${name} anime`);
          return (
            (res as Awaited<ReturnType<typeof searchAnimeFromAnitaku>>).length >
            0
          );
        }),
      };
    } catch (e) {
      console.error(`Failed to fetch ${name} anime`, e);
      const nextFn = functions.at(index + 1);
      if (nextFn) {
        return await getAnime(query, page, nextFn.name, index + 1, nextFn.fn);
      }
      return {
        animes: [],
        hasNext: false,
      };
    }
  };

  return await getAnime(query, page, functions[0].name, 0, functions[0].fn);
}
