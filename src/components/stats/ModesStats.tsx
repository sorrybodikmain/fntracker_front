import { getTranslations } from 'next-intl/server'
import { ModeItem } from '@/components/stats/ModeItem'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { BRStats } from '@/types/fnapi'

interface ModesStatsProps {
	stats: BRStats
}

export async function ModesStats({ stats }: ModesStatsProps) {
	const t = await getTranslations('stats')
	const modes = stats.stats?.all

	if (!modes) return null

	return (
		<div className=':uno: mt-8'>
			<SectionHeading>{t('modes_title')}</SectionHeading>
			<div className=':uno: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
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
