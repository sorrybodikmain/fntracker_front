import { hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Providers } from '../providers'
import { Layout } from '@/components/Layout'

type LocaleLayoutProps = {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}

export function generateStaticParams() {
	return routing.locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
	children,
	params
}: LocaleLayoutProps) {
	const { locale } = await params

	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	setRequestLocale(locale)
	const messages = await getMessages()

	return (
		<Providers locale={locale} messages={messages as Record<string, Record<string, string>>}>
			<Layout>{children}</Layout>
		</Providers>
	)
}
