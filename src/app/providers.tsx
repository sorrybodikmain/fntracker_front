'use client'

import { NextIntlClientProvider } from 'next-intl'
import { ToastContainer } from 'react-toastify'

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
			{children}
			<ToastContainer
				position='top-right'
				closeOnClick
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='colored'
			/>
		</NextIntlClientProvider>
	)
}
