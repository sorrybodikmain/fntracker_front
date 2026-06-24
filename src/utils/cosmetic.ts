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

export function entryImage(entry: ShopEntry) {
  return shopEntryImage(entry);
}

export function cosmeticDisplayImage(item: BRCosmetic) {
  return cosmeticImage(item);
}
