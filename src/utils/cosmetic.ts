import type { BRCosmetic, ShopEntry } from "@/types/fnapi";
import { cosmeticImage, shopEntryImage } from "./api.utils";

export function entryCosmeticId(entry: ShopEntry) {
  return entry.brItems?.[0]?.id ?? entry.offerId;
}

export function entryLayoutId(entry: ShopEntry) {
  return entry.layout?.id ?? entry.layoutId;
}

export function entryLayoutName(entry: ShopEntry) {
  return entry.layout?.name ?? entry.layoutId;
}

export function entryCosmeticName(entry: ShopEntry) {
  return entry.brItems?.[0]?.name ?? entry.devName;
}

export function isVirtualShopEntry(entry: ShopEntry) {
  return entryCosmeticName(entry).includes("[VIRTUAL]");
}

const MINI_SHOP_LIMIT = 6;
const MINI_SHOP_MAX_SECTION_SIZE = 40;

export function getMiniShopEntries(
  entries: ShopEntry[],
  limit = MINI_SHOP_LIMIT,
) {
  const byLayout = (layoutId: string) =>
    entries.filter((entry) => entryLayoutId(entry) === layoutId);

  const daily = entries.filter((entry) =>
    entryLayoutName(entry).toLowerCase().includes("daily"),
  );
  if (daily.length) return daily.slice(0, limit);

  const mainPool = byLayout("alc.0");
  if (mainPool.length) return mainPool.slice(0, limit);

  const sectionIds = [
    ...new Set(entries.map((entry) => entryLayoutId(entry)).filter(Boolean)),
  ];

  const previewSectionId = sectionIds
    .map((id) => {
      const sectionEntries = byLayout(id);
      const sample = sectionEntries[0];
      return {
        id,
        index: sample?.layout?.index ?? 999,
        size: sectionEntries.length,
      };
    })
    .filter((section) => section.size <= MINI_SHOP_MAX_SECTION_SIZE)
    .sort((a, b) => a.index - b.index)[0]?.id;

  if (previewSectionId) {
    return byLayout(previewSectionId).slice(0, limit);
  }

  return [...entries]
    .sort((a, b) => a.sortPriority - b.sortPriority)
    .slice(0, limit);
}

export function entryImage(entry: ShopEntry) {
  return shopEntryImage(entry);
}

export function cosmeticDisplayImage(item: BRCosmetic) {
  return cosmeticImage(item);
}
