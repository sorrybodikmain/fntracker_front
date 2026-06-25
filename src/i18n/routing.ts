import { defineRouting } from "next-intl/routing";
import { siteConfig } from "@/config/site";

export const locales = ["en", "ru"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: "en",
  localePrefix: "never",
  localeCookie: {
    name: siteConfig.localeCookie,
    maxAge: 60 * 60 * 24 * 365,
  },
});
