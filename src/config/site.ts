export const siteConfig = {
  name: "FortniteTracker",
  title: "FortniteTracker — Stats, Shop & Map",
  description:
    "Fortnite player stats, daily item shop, BR map, cosmetics catalog, playlists, and in-game news in one place.",
  keywords:
    "fortnite stats, fortnite item shop, fortnite map, fortnite cosmetics, fortnite player lookup",
  url: "https://fntrackerfront.vercel.app",
  contactEmail: "hello@fortnitetracker.app",
  localeCookie: "fortnite-tracker-locale",
  likesStorage: "fortnite-tracker-likes",
  cookieConsent: "fortnite-tracker-cookie-consent",
} as const;

export function pageTitle(segment?: string) {
  return segment ? `${segment} | ${siteConfig.name}` : siteConfig.title;
}
