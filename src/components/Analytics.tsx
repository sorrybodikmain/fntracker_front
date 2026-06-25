'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { initGA, logPageView } from '@/utils/gtag.utils'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-0PPX7B396X'

export function Analytics() {
	const pathname = usePathname()

	useEffect(() => {
		initGA(GA_ID)
	}, [])

	useEffect(() => {
		logPageView()
	}, [pathname])

	return (
		<Script
			strategy='afterInteractive'
			src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
		/>
	)
}
