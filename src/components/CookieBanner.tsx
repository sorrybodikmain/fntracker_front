'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { siteConfig } from '@/config/site'

const CONSENT_KEY = siteConfig.cookieConsent

export function CookieBanner() {
	const t = useTranslations('cookie-banner')
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		if (typeof window !== 'undefined' && !localStorage.getItem(CONSENT_KEY)) {
			setVisible(true)
		}
	}, [])

	const accept = () => {
		localStorage.setItem(CONSENT_KEY, 'accepted')
		setVisible(false)
	}

	if (!visible) return null

	return (
		<div className=':uno: fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-6 md:max-w-md'>
			<GlassPanel className=':uno: p-4 md:p-5'>
				<p className=':uno: text-sm text-muted mb-4'>{t('message')}</p>
				<Button size='sm' onClick={accept}>
					{t('accept')}
				</Button>
			</GlassPanel>
		</div>
	)
}
