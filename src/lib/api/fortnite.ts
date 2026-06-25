import "server-only";
import type { BRCosmeticsSearchRequestParams } from "fnapicom";
import { ResponseFlags } from "fnapicom";
import { unstable_cache } from "next/cache";
import { createFnApiClient } from "./client";
import { isVirtualShopEntry } from "@/utils/cosmetic";
import { toApiLanguage } from "@/i18n/locale";
import type { BRNews } from "@/types/fnapi";

const emptyNews = (): BRNews => ({
  hash: "",
  date: "",
  image: "",
  motds: [],
  messages: [],
});

const langFallbackChain = (lang: string): string[] => {
  const apiLang = toApiLanguage(lang);
  if (apiLang === "ru") return ["ru", "en"];
  return ["en"];
};

async function tryLangChain<T>(
  chain: string[],
  fetch: (language: string) => Promise<T>,
  fallback: T,
): Promise<T> {
  for (const language of chain) {
    try {
      return await fetch(language);
    } catch {
      continue;
    }
  }
  return fallback;
}

type NewsFetcher = (options: {
  language?: string;
}) => Promise<{ data: BRNews }>;

async function getNewsWithFallback(fetcher: NewsFetcher, lang: string) {
  const fetch = async (language: string) => {
    const { data } = await fetcher({ language });
    return data;
  };

  return tryLangChain(langFallbackChain(lang), fetch, emptyNews());
}

async function fetchListWithLangFallback<T>(
  fetcher: (language: string) => Promise<{ data: T[] }>,
  lang: string,
): Promise<T[]> {
  const fetch = async (language: string) => {
    const { data } = await fetcher(language);
    return data ?? [];
  };

  return tryLangChain(langFallbackChain(lang), fetch, []);
}

async function fetchWithLangFallback<T>(
  fetcher: (language: string) => Promise<{ data: T }>,
  lang: string,
): Promise<T> {
  const fetch = async (language: string) => {
    const { data } = await fetcher(language);
    return data;
  };

  const chain = langFallbackChain(lang);
  for (const language of chain) {
    try {
      return await fetch(language);
    } catch {
      continue;
    }
  }
  throw new Error("Request failed");
}

export function getShop(lang: string) {
  const apiLang = toApiLanguage(lang);
  return unstable_cache(
    async () => {
      const data = await fetchWithLangFallback(
        (language) => createFnApiClient().shop({ language }),
        apiLang,
      );
      return {
        ...data,
        entries: data.entries.filter((entry) => !isVirtualShopEntry(entry)),
      };
    },
    ["shop", apiLang],
    { revalidate: 300, tags: [`shop-${apiLang}`] },
  )();
}

export function getNews(lang: string) {
  return unstable_cache(
    async () =>
      getNewsWithFallback(
        (options) => createFnApiClient().brNews(options),
        lang,
      ),
    ["news", lang],
    { revalidate: 600, tags: [`news-${lang}`] },
  )();
}

export function getStwNews(lang: string) {
  return unstable_cache(
    async () =>
      getNewsWithFallback(
        (options) => createFnApiClient().stwNews(options),
        lang,
      ),
    ["stw-news", lang],
    { revalidate: 600, tags: [`stw-news-${lang}`] },
  )();
}

export function getCreativeNews(lang: string) {
  return unstable_cache(
    async () =>
      getNewsWithFallback(
        (options) => createFnApiClient().creativeNews(options),
        lang,
      ),
    ["creative-news", lang],
    { revalidate: 600, tags: [`creative-news-${lang}`] },
  )();
}

export function getCosmetic(id: string, lang: string) {
  return unstable_cache(
    async () =>
      fetchWithLangFallback(
        (language) =>
          createFnApiClient().brCosmeticByID(id, {
            language,
            responseFlags: ResponseFlags.IncludeShopHistory,
          }),
        lang,
      ),
    ["cosmetic", id, lang],
    { revalidate: 3600, tags: [`cosmetic-${id}-${lang}`] },
  )();
}

export function getCosmeticsList(lang: string) {
  return unstable_cache(
    async () =>
      fetchWithLangFallback(
        (language) => createFnApiClient().brCosmeticsList({ language }),
        lang,
      ),
    ["cosmetics-list", lang],
    { revalidate: 3600, tags: [`cosmetics-list-${lang}`] },
  )();
}

export async function searchCosmetics(query: string, lang: string) {
  const search = async (language: string) => {
    const { data } = await createFnApiClient().brCosmeticsSearch({
      language,
      name: query,
      matchMethod: "contains",
    } as BRCosmeticsSearchRequestParams);
    return data ?? [];
  };

  return tryLangChain(langFallbackChain(lang), search, []);
}

export function getNewCosmetics(lang: string) {
  return unstable_cache(
    async () =>
      fetchWithLangFallback(
        (language) => createFnApiClient().newCosmetics({ language }),
        lang,
      ),
    ["new-cosmetics", lang],
    { revalidate: 3600, tags: [`new-cosmetics-${lang}`] },
  )();
}

export function getMap(lang: string) {
  return unstable_cache(
    async () =>
      fetchWithLangFallback(
        (language) => createFnApiClient().brMap({ language }),
        lang,
      ),
    ["map", lang],
    { revalidate: 86400, tags: ["map"] },
  )();
}

export function getPlaylists(lang: string) {
  return unstable_cache(
    async () =>
      fetchListWithLangFallback(
        (language) => createFnApiClient().playlists({ language }),
        lang,
      ),
    ["playlists", lang],
    { revalidate: 3600, tags: [`playlists-${lang}`] },
  )();
}

export function getPlaylistById(id: string, lang: string) {
  return unstable_cache(
    async () =>
      fetchWithLangFallback(
        (language) => createFnApiClient().playlistByID(id, { language }),
        lang,
      ),
    ["playlist", id, lang],
    { revalidate: 3600, tags: [`playlist-${id}`] },
  )();
}

export function getBanners(lang: string) {
  return unstable_cache(
    async () =>
      fetchListWithLangFallback(
        (language) => createFnApiClient().banners({ language }),
        lang,
      ),
    ["banners", lang],
    { revalidate: 86400, tags: [`banners-${lang}`] },
  )();
}

export function getBannerColors() {
  return unstable_cache(
    async () => {
      try {
        const { data } = await createFnApiClient().bannerColors();
        return data ?? [];
      } catch {
        return [];
      }
    },
    ["banner-colors"],
    { revalidate: 86400, tags: ["banner-colors"] },
  )();
}

export function getTrackCosmetics() {
  return unstable_cache(
    async () => {
      try {
        const { data } = await createFnApiClient().trackCosmeticsList();
        return data ?? [];
      } catch {
        return [];
      }
    },
    ["track-cosmetics"],
    { revalidate: 3600, tags: ["track-cosmetics"] },
  )();
}

export function getCarCosmetics(lang: string) {
  return unstable_cache(
    async () =>
      fetchListWithLangFallback(
        (language) => createFnApiClient().carCosmeticsList({ language }),
        lang,
      ),
    ["car-cosmetics", lang],
    { revalidate: 3600, tags: [`car-cosmetics-${lang}`] },
  )();
}

export function getLegoCosmetics() {
  return unstable_cache(
    async () => {
      try {
        const { data } = await createFnApiClient().legoCosmeticsList();
        return data ?? [];
      } catch {
        return [];
      }
    },
    ["lego-cosmetics"],
    { revalidate: 3600, tags: ["lego-cosmetics"] },
  )();
}

export function getInstrumentCosmetics(lang: string) {
  return unstable_cache(
    async () =>
      fetchListWithLangFallback(
        (language) => createFnApiClient().instrumentCosmeticsList({ language }),
        lang,
      ),
    ["instrument-cosmetics", lang],
    { revalidate: 3600, tags: [`instrument-cosmetics-${lang}`] },
  )();
}

export function getBeanCosmetics(lang: string) {
  return unstable_cache(
    async () =>
      fetchListWithLangFallback(
        (language) => createFnApiClient().beanCosmeticsList({ language }),
        lang,
      ),
    ["bean-cosmetics", lang],
    { revalidate: 3600, tags: [`bean-cosmetics-${lang}`] },
  )();
}

export function getAesKeys() {
  return unstable_cache(
    async () => {
      const { data } = await createFnApiClient().aesKeys();
      return data;
    },
    ["aes-keys"],
    { revalidate: 3600, tags: ["aes-keys"] },
  )();
}

export function getBrStats(name: string) {
  return unstable_cache(
    async () => {
      const { data } = await createFnApiClient().brStats({
        name,
        timeWindow: "lifetime",
      });
      return data;
    },
    ["stats", name],
    { revalidate: 60, tags: [`stats-${name}`] },
  )();
}

export function getBrStatsByAccountId(accountId: string) {
  return unstable_cache(
    async () => {
      const { data } = await createFnApiClient().brStatsByAccountID(accountId, {
        timeWindow: "lifetime",
      });
      return data;
    },
    ["stats-account", accountId],
    { revalidate: 60, tags: [`stats-account-${accountId}`] },
  )();
}

export function isAccountId(value: string) {
  return /^[a-f0-9]{32}$/i.test(value);
}
