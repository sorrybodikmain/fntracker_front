import { getTranslations } from 'next-intl/server'
import { ModeItem } from '@/components/stats/ModeItem'
import type { BRStats } from '@/types/fnapi'

interface ModesStatsProps {
	stats: BRStats
}

export async function ModesStats({ stats }: ModesStatsProps) {
	const t = await getTranslations('stats')
	const modes = stats.stats?.all

	if (!modes) return null

	return (
		<div className=':uno: container text-white mx-auto p-3'>
			<h1 className=':uno: border-l-4 border-primary pl-2 mb-4'>
				{t('modes_title').toUpperCase()}
			</h1>
			<div className=':uno: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
				{modes.solo?.matches ? (
					<ModeItem mode='SOLOS' data={modes.solo} />
				) : null}
				{modes.duo?.matches ? <ModeItem mode='DUOS' data={modes.duo} /> : null}
				{modes.trio?.matches ? (
					<ModeItem mode='TRIOS' data={modes.trio} />
				) : null}
				{modes.squad?.matches ? (
					<ModeItem mode='SQUADS' data={modes.squad} />
				) : null}
			</div>
		</div>
	)
}
