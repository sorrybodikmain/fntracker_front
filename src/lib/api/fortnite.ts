import "server-only";
import { unstable_cache } from "next/cache";
import { ResponseFlags } from "fnapicom";
import { createFnApiClient } from "./client";

export function getShop(lang: string) {
  return unstable_cache(
    async () => {
      const { data } = await createFnApiClient().shop({ language: lang });
      return data;
    },
    ["shop", lang],
    { revalidate: 300, tags: [`shop-${lang}`] },
  )();
}

export function getNews(lang: string) {
  return unstable_cache(
    async () => {
      const { data } = await createFnApiClient().brNews({ language: lang });
      return data;
    },
    ["news", lang],
    { revalidate: 600, tags: [`news-${lang}`] },
  )();
}

export function getCosmetic(id: string, lang: string) {
  return unstable_cache(
    async () => {
      const { data } = await createFnApiClient().brCosmeticByID(id, {
        language: lang,
        responseFlags: ResponseFlags.IncludeShopHistory,
      });
      return data;
    },
    ["cosmetic", id, lang],
    { revalidate: 3600, tags: [`cosmetic-${id}-${lang}`] },
  )();
}

export function getCosmeticsList(lang: string) {
  return unstable_cache(
    async () => {
      const { data } = await createFnApiClient().brCosmeticsList({
        language: lang,
      });
      return data;
    },
    ["cosmetics-list", lang],
    { revalidate: 3600, tags: [`cosmetics-list-${lang}`] },
  )();
}

export function getNewCosmetics(lang: string) {
  return unstable_cache(
    async () => {
      const { data } = await createFnApiClient().newCosmetics({
        language: lang,
      });
      return data;
    },
    ["new-cosmetics", lang],
    { revalidate: 3600, tags: [`new-cosmetics-${lang}`] },
  )();
}

export function getMap(lang: string) {
  return unstable_cache(
    async () => {
      const { data } = await createFnApiClient().brMap({ language: lang });
      return data;
    },
    ["map", lang],
    { revalidate: 86400, tags: ["map"] },
  )();
}

export async function getBrStats(name: string) {
  const { data } = await createFnApiClient().brStats({
    name,
    timeWindow: "lifetime",
  });
  return data;
}
