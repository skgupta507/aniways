import type { MyListStatus, RelatedAnime } from "@animelist/client";
import { MALClient } from "@animelist/client";
import { distance } from "fastest-levenshtein";
import { Jikan4 } from "node-myanimelist";

import { env } from "../../env";

type Args = {
  accessToken: string | undefined;
} & (
  | {
      title: string;
    }
  | {
      malId: number;
    }
);

const getListStatusAndRelatedAnimeFromMAL = (
  malId: number,
  accessToken: string | undefined,
) => {
  const client = new MALClient(
    accessToken
      ? { accessToken }
      : {
          clientId: env.MAL_CLIENT_ID,
        },
  );

  return client
    .getAnimeDetails(malId, {
      fields: ["my_list_status", "related_anime"],
    })
    .then((res) => ({
      listStatus: res?.my_list_status,
      relatedAnime: res?.related_anime ?? [],
    }));
};

export type AnimeDetails = Jikan4.Types.Anime & {
  listStatus: MyListStatus | undefined;
  relatedAnime: RelatedAnime[];
};

export default async function getAnimeDetails(
  args: Args,
): Promise<AnimeDetails | undefined> {
  const { accessToken } = args;

  if ("malId" in args) {
    console.log("Getting anime details of", args.malId);

    const data = await Jikan4.anime(args.malId)
      .info()
      .then((res) => res.data);

    const { listStatus, relatedAnime } =
      await getListStatusAndRelatedAnimeFromMAL(args.malId, accessToken);

    return {
      ...data,
      listStatus,
      relatedAnime,
    };
  }

  console.log("Getting anime details of", args.title);

  const data = (await Jikan4.animeSearch({ q: encodeURI(args.title) })).data
    .map((anime) => ({
      ...anime,
      distance: distance(anime.title ?? "", args.title),
    }))
    .sort((a, b) => a.distance - b.distance)
    .at(0);

  if (!data?.mal_id) {
    return undefined;
  }

  return {
    ...data,
    ...(await getListStatusAndRelatedAnimeFromMAL(data.mal_id, accessToken)),
  };
}
