import { hasLocale } from "next-intl";
import { locales, routing, type Locale } from "./routing";

export function normalizeLocale(locale: string | undefined): Locale {
  if (locale && hasLocale(locales, locale)) {
    return locale;
  }
  return routing.defaultLocale;
}

export function toApiLanguage(locale: string): "en" | "ru" {
  return normalizeLocale(locale) === "ru" ? "ru" : "en";
}
