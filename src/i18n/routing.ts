import { defineRouting } from 'next-intl/routing'

export const locales = ['de', 'es', 'fr', 'it', 'pl', 'en', 'ru'] as const
export type Locale = (typeof locales)[number]

export const routing = defineRouting({
	locales: [...locales],
	defaultLocale: 'en',
	localePrefix: 'never',
	localeCookie: {
		name: 'fntracker-locale',
		maxAge: 60 * 60 * 24 * 365
	}
})
