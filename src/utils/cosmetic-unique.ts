import type { BRCosmetic } from "@/types/fnapi";

export function dedupeCosmeticsById(cosmetics: BRCosmetic[]): BRCosmetic[] {
  const seen = new Set<string>();
  return cosmetics.filter((cosmetic) => {
    if (!cosmetic.id || seen.has(cosmetic.id)) return false;
    seen.add(cosmetic.id);
    return true;
  });
}

export function cosmeticInstanceId(
  cosmetic: BRCosmetic,
  index: number,
): string {
  return `${cosmetic.id}-${index}`;
}
