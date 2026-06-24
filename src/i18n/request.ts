import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'
import { namespaces } from './namespaces'

export default getRequestConfig(async ({ requestLocale }) => {
	const requested = await requestLocale
	const locale = hasLocale(routing.locales, requested)
		? requested
		: routing.defaultLocale

	const messages: Record<string, Record<string, string>> = {}

	for (const ns of namespaces) {
		messages[ns] = (
			await import(`../../messages/${locale}/${ns}.json`)
		).default
	}

	return { locale, messages }
})
