'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { initGA, logPageView } from '@/utils/gtag.utils'

export function Analytics() {
	useEffect(() => {
		initGA('G-0PPX7B396X')
		logPageView()
	}, [])

	return (
		<Script
			src='https://www.googletagmanager.com/gtag/js?id=G-0PPX7B396X'
			strategy='afterInteractive'
		/>
	)
}
