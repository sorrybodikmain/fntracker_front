const GRAY_PATTERN = /^Gray([0-9A-Fa-f]{6,8})(Dark|Light)?$/;
const HUE_PATTERN = /^([A-Za-z]+)H(\d+)(Dark|Light)?$/;

function clampByte(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function parseGrayColor(raw: string): string | null {
  const match = raw.match(GRAY_PATTERN);
  if (!match) return null;

  const hex = match[1];
  const variant = match[2];
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);
  const a = hex.length >= 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;

  if (variant === "Dark") {
    r = clampByte(r * 0.72);
    g = clampByte(g * 0.72);
    b = clampByte(b * 0.72);
  } else if (variant === "Light") {
    r = clampByte(r + (255 - r) * 0.28);
    g = clampByte(g + (255 - g) * 0.28);
    b = clampByte(b + (255 - b) * 0.28);
  }

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function parseHueColor(raw: string): string | null {
  const match = raw.match(HUE_PATTERN);
  if (!match) return null;

  const hue = Number(match[2]);
  const variant = match[3];
  let saturation = 82;
  let lightness = 46;

  if (variant === "Dark") {
    saturation = 78;
    lightness = 30;
  } else if (variant === "Light") {
    saturation = 76;
    lightness = 62;
  }

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function parseBannerColor(
  raw: string | null | undefined,
): string | null {
  if (!raw) return null;

  const trimmed = raw.trim();
  if (!trimmed) return null;

  if (/^#?[0-9A-Fa-f]{6}$/.test(trimmed)) {
    return trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
  }

  return parseGrayColor(trimmed) ?? parseHueColor(trimmed);
}
