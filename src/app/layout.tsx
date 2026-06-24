import { getLocale, getMessages } from 'next-intl/server'
import type { Metadata } from 'next'
import { Providers } from './providers'
import { Layout } from '@/components/Layout'
import '@unocss/reset/tailwind.css'
import '../uno.css'
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
	title: 'FNTracker',
	description:
		'Welcome to FNTracker! Here you will be able to track your Fortnite stats and add store items to your locker.',
	keywords:
		'fortnite tracker, fortnite tracker events, fortnite tracker item shop, fortnite tracker stats',
	robots: 'index, follow',
	manifest: '/manifest.json',
	icons: {
		icon: '/images/icons/icon-192x192.png',
		apple: '/images/icons/icon-192x192.png'
	},
	themeColor: '#151515',
	openGraph: {
		type: 'website',
		siteName: 'FNTracker'
	}
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const locale = await getLocale()
	const messages = await getMessages()

	return (
		<html lang={locale}>
			<body>
				<Providers locale={locale} messages={messages as Record<string, Record<string, string>>}>
					<Layout>{children}</Layout>
				</Providers>
			</body>
		</html>
	)
}
