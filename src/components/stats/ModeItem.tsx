import { getTranslations } from 'next-intl/server'
import type { ModeStats } from '@/types/fnapi'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface ModeItemProps {
	data: ModeStats
	mode: string
}

export async function ModeItem({ data, mode }: ModeItemProps) {
	const t = await getTranslations('stats')
	const topHigh =
		'top10' in data
			? data.top10
			: 'top5' in data
				? data.top5
				: 'top3' in data
					? data.top3
					: 0
	const topLow =
		'top25' in data
			? data.top25
			: 'top12' in data
				? data.top12
				: 'top6' in data
					? data.top6
					: 0

	const stats = [
		{ label: 'WINS', value: data.wins },
		{ label: 'KILLS', value: data.kills },
		{ label: 'WIN %', value: data.winRate },
		{ label: 'K/D', value: data.kd },
		{ label: 'TOP 10', value: topHigh },
		{ label: 'TOP 25', value: topLow },
		{ label: 'TIME PLAYED', value: data.minutesPlayed },
		{
			label: 'AVG. MATCH',
			value: data.matches ? `${Math.floor(data.minutesPlayed / data.matches)} min.` : '0'
		},
		{
			label: 'KILLS/MATCH',
			value: data.matches ? Math.floor(data.kills / data.matches) : 0
		},
		{
			label: 'KILLS/MIN',
			value: data.minutesPlayed ? Math.floor(data.kills / data.minutesPlayed) : 0
		},
		{
			label: 'SCORE/MATCH',
			value: data.matches ? Math.floor(data.score / data.matches) : 0
		},
		{
			label: 'SCORE/MIN',
			value: data.minutesPlayed ? Math.floor(data.score / data.minutesPlayed) : 0
		},
		{ label: 'SCORE', value: data.score }
	]

	return (
		<Card hover className=':uno: overflow-hidden'>
			<div className=':uno: flex items-center justify-between px-4 py-2 bg-primary/15 border-b border-primary/30'>
				<p className=':uno: font-display font-bold text-primary'>{mode}</p>
				<Badge variant='muted'>
					{data.matches} {t('modes_matches_played')}
				</Badge>
			</div>
			<div className=':uno: p-4 grid grid-cols-2 gap-3'>
				{stats.map(stat => (
					<div
						key={stat.label}
						className=':uno: border-b border-white/8 pb-2'
					>
						<p className=':uno: text-xs text-muted uppercase tracking-wider'>
							{stat.label}
						</p>
						<p className=':uno: text-lg font-semibold text-foreground mt-0.5'>
							{stat.value}
						</p>
					</div>
				))}
			</div>
		</Card>
	)
}
