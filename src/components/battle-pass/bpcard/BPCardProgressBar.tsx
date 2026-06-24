'use client'

import { useTranslations } from 'next-intl'
import type { BPSeasonDates } from '@/interfaces'
import { getPercentByDates } from '@/utils'

interface BPCardProgressBarProps {
	dates: BPSeasonDates
}

export function BPCardProgressBar({ dates }: BPCardProgressBarProps) {
	const t = useTranslations('battle-pass')
	const percent = getPercentByDates({
		begin: new Date(dates.begin).toISOString(),
		end: new Date(dates.end).toISOString()
	})

	return (
		<div className=':uno: py-1 w-full'>
			<div className=':uno: flex mb-2 items-center justify-between'>
				<h2 className=':uno: text-md uppercase'>{t('bp_progress')}</h2>
				<div className=':uno: text-right'>
					<span className=':uno: text-xs inline-block'>
						{percent > 100 ? 100 : percent} %
					</span>
				</div>
			</div>
			<div className=':uno: mb-2 overflow-hidden h-4 text-xs flex rounded bg-blue-700 border-gray-700 border'>
				<div style={{ width: `${percent}%` }} className=':uno: bg-primary' />
			</div>
			<div className=':uno: flex justify-between text-gray-300'>
				<p className=':uno: text-xs inline-block'>
					{new Date(dates.begin).toLocaleDateString()}
				</p>
				<p className=':uno: text-xs inline-block'>
					{new Date(dates.end).toLocaleDateString()}
				</p>
			</div>
		</div>
	)
}
