/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { chunk } from "lodash";
import { parse } from "node-html-parser";

const BASE_URL = "https://gogotaku.info/recent-release-anime";

export default async function getRecentlyReleasedAnimeFromGogoTaku(
  page: number,
  abortSignal: AbortSignal
) {
  // each page is 60 anime we want 20 per page
  // page 1 = 1-20
  // page 2 = 21-40
  // page 3 = 41-60
  const response = await fetch(`${BASE_URL}?page=${Math.ceil(page / 3)}`, {
    signal: abortSignal,
  }).then(res => res.text());

  const recentlyReleased =
    chunk(
      parse(response)
        .querySelectorAll(".main_body .page_content li")
        .map(li => {
          const image = li
            .querySelector(".img a img")!
            .getAttribute("data-original")!;

          const name = li.querySelector(".name")!.innerText.trim();

          const episode = Number(
            li
              .querySelector("p.released")!
              .innerText.trim()
              .split("Episode: ")[1]
          );

          const slug = li
            .querySelector("a")!
            .getAttribute("href")!
            .split("/")
            .pop()!
            .split("-episode-")[0]!;

          const url = `/anime/${slug}/episodes/${episode}`;

          return {
            name,
            image,
            episode,
            url,
          };
        }),
      20
    )[
      page % 3 === 0 ? 2
      : page % 3 === 1 ? 0
      : 1
    ] ?? [];

  return recentlyReleased;
}
