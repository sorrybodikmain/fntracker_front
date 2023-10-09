import { FC, PropsWithChildren } from 'react'
import ModeItem from '@/components/stats/ModeItem'
import { useTranslation } from 'react-i18next'
import { AccountStatsResponse } from '@/interfaces/user-stats.interface.ts'

const ModesStats: FC<PropsWithChildren<{ data: AccountStatsResponse }>> = ({
	data
}) => {
	const { t } = useTranslation('stats')
	return (
		<div className=':uno: container text-white mx-auto p-3'>
			<h1 className=':uno: border-l-4 border-primary pl-2 mb-4'>
				{t('modes_title').toUpperCase()}
			</h1>
			<div className=':uno: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
				{data.global_stats.solo && (
					<ModeItem mode={'SOLOS'} data={data.global_stats.solo} />
				)}
				{data.global_stats.duo && (
					<ModeItem mode={'DUOS'} data={data.global_stats.duo} />
				)}
				{data.global_stats.trio && (
					<ModeItem mode={'TRIOS'} data={data.global_stats.trio} />
				)}
				{data.global_stats.squad && (
					<ModeItem mode={'SQUADS'} data={data.global_stats.squad} />
				)}
			</div>
		</div>
	)
}

export default ModesStats
