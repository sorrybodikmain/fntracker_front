export function fixImageWidth(url: string, width = 480) {
  if (!url) return url;
  try {
    const url1 = new URL(url);
    url1.searchParams.set("width", width.toString());
    return url1.toString();
  } catch {
    return url;
  }
}

export function cosmeticImage(cosmetic: {
  images: { featured?: string; icon?: string; smallIcon?: string };
}) {
  return (
    cosmetic.images.featured ||
    cosmetic.images.icon ||
    cosmetic.images.smallIcon ||
    ""
  );
}

export function shopEntryImage(entry: {
  newDisplayAsset?: { renderImages?: { image: string }[] };
  bundle?: { image: string };
  brItems?: { images: { featured?: string; icon?: string } }[];
}) {
  const render = entry.newDisplayAsset?.renderImages?.[0]?.image;
  if (render) return render;
  const item = entry.brItems?.[0];
  if (item) return item.images.featured || item.images.icon || "";
  return entry.bundle?.image || "";
}
