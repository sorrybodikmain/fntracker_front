'use client'

import { useEffect, useState } from 'react'
import { BiCookie } from 'react-icons/bi'
import { useTranslations } from 'next-intl'
import { useCookieConsentStore } from '@/stores/use-cookie-consent-store'

export function CookieBanner() {
	const [mounted, setMounted] = useState(false)
	const accepted = useCookieConsentStore(state => state.accepted)
	const accept = useCookieConsentStore(state => state.accept)
	const t = useTranslations('cookie-banner')

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted || accepted) return null

	return (
		<div className=':uno: fixed bottom-5 z-10 text-white p-3 left-1/2 -translate-x-1/2 container'>
			<div className=':uno: flex flex-wrap bg-gray-700 shadow-xl shadow-gray-900 rounded-lg p-2 transition hover:scale-[1.01]'>
				<div className=':uno: w-full flex items-center justify-between'>
					<div className=':uno: w-full flex flex-row'>
						<BiCookie className=':uno: my-1 mx-2 text-lg sm:text-sm' />
						{t('banner_body')}
					</div>
					<div className=':uno: flex ml-3 gap-x-2 text-xs'>
						<button
							onClick={() => accept()}
							className=':uno: bg-primary hover:bg-indigo-400 p-1 rounded'
						>
							{t('banner_accept')}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
