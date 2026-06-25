'use client'

import { LayoutGroup } from 'motion/react'
import { NextIntlClientProvider } from 'next-intl'
import { CosmeticModalHost } from '@/components/locker/CosmeticModalHost'
import { PlaylistModalHost } from '@/components/playlists/PlaylistModalHost'

interface ProvidersProps {
	children: React.ReactNode
	locale: string
	messages: Record<string, Record<string, string>>
}

export function Providers({ children, locale, messages }: ProvidersProps) {
	return (
		<NextIntlClientProvider
			locale={locale}
			messages={messages}
			timeZone='Europe/Kyiv'
		>
			<LayoutGroup id='app-layout'>
				{children}
				<CosmeticModalHost />
				<PlaylistModalHost />
			</LayoutGroup>
		</NextIntlClientProvider>
	)
}
