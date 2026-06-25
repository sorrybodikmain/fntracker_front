'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { Badge } from '@/components/ui/Badge'

function formatCountdown(date: Date) {
	const h = 23 - date.getUTCHours()
	const m = 59 - date.getUTCMinutes()
	const s = 60 - date.getUTCSeconds()
	return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function ShopBanner() {
	const [value, setValue] = useState(() => new Date())
	const t = useTranslations('shop')

	useEffect(() => {
		const interval = setInterval(() => setValue(new Date()), 1000)
		return () => clearInterval(interval)
	}, [])

	return (
		<GlassPanel className=':uno: p-5 md:p-6 mb-6 border-primary/20'>
			<div className=':uno: flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
				<div>
					<h2 className=':uno: font-display text-lg md:text-xl font-bold text-foreground'>
						{t('banner_title')}
					</h2>
					<p className=':uno: mt-1 text-sm text-muted'>{t('banner_body')}</p>
				</div>
				<div className=':uno: text-center md:text-right'>
					<p className=':uno: text-xs text-muted uppercase tracking-wider mb-1'>
						{t('banner_update')}
					</p>
					<Badge variant='primary' className=':uno: font-display text-base px-4 py-1.5 tabular-nums'>
						{formatCountdown(value)}
					</Badge>
				</div>
			</div>
		</GlassPanel>
	)
}
