import { getLocale } from 'next-intl/server'
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Orbitron } from 'next/font/google'
import '@unocss/reset/tailwind.css'
import '../uno.css'
import '../styles/globals.css'

const orbitron = Orbitron({
	subsets: ['latin'],
	variable: '--font-orbitron',
	display: 'swap'
})

const dmSans = DM_Sans({
	subsets: ['latin', 'latin-ext'],
	variable: '--font-dm-sans',
	display: 'swap'
})

export const metadata: Metadata = {
	title: 'FNTracker — Fortnite Stats, Shop & Map',
	description:
		'Track Fortnite player stats, browse the item shop, explore the BR map, and discover cosmetics — all in one sleek tracker.',
	keywords:
		'fortnite tracker, fortnite stats, fortnite item shop, fortnite map, fortnite cosmetics',
	robots: 'index, follow',
	manifest: '/manifest.json',
	icons: {
		icon: '/images/icons/icon-192x192.png',
		apple: '/images/icons/icon-192x192.png'
	},
	openGraph: {
		type: 'website',
		siteName: 'FNTracker',
		title: 'FNTracker — Fortnite Stats, Shop & Map',
		description:
			'Track Fortnite player stats, browse the item shop, explore the BR map, and discover cosmetics.'
	}
}

export const viewport: Viewport = {
	themeColor: '#08080F'
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const locale = await getLocale()

	return (
		<html
			lang={locale}
			suppressHydrationWarning
			className={`${orbitron.variable} ${dmSans.variable}`}
		>
			<body className='font-body antialiased'>{children}</body>
		</html>
	)
}
