'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { initGA, logPageView } from '@/utils/gtag.utils'
import { useCookieConsentStore } from '@/stores/use-cookie-consent-store'

export function Analytics() {
	const [mounted, setMounted] = useState(false)
	const accepted = useCookieConsentStore(state => state.accepted)

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		if (!mounted || !accepted) return
		initGA('G-0PPX7B396X')
		logPageView()
	}, [mounted, accepted])

	if (!mounted || !accepted) return null

	return (
		<Script
			src='https://www.googletagmanager.com/gtag/js?id=G-0PPX7B396X'
			strategy='afterInteractive'
		/>
	)
}
