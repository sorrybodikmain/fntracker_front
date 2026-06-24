import { getLocale } from 'next-intl/server'
import type { Metadata } from 'next'
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

	return (
		<html lang={locale} suppressHydrationWarning>
			<body>{children}</body>
		</html>
	)
}
