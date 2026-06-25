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

import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
	keywords: siteConfig.keywords,
	robots: 'index, follow',
	manifest: '/manifest.json',
	icons: {
		icon: '/images/icons/icon-192x192.png',
		apple: '/images/icons/icon-192x192.png'
	},
	openGraph: {
		type: 'website',
		siteName: siteConfig.name,
		title: siteConfig.title,
		description: siteConfig.description
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
