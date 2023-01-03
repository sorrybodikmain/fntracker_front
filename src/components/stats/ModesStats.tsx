import { FC, PropsWithChildren } from 'react'
import ModeItem from '@/components/stats/ModeItem'
import { AccountStatsResponse } from '@/api/types/user-stats.type'
import { useTranslation } from 'react-i18next'

const ModesStats: FC<PropsWithChildren<{ data: AccountStatsResponse }>> = ({ data }) => {
const {t} = useTranslation('stats')
	return (
		<div className='container text-white mx-auto p-3'>
			<h2 className='border-l-4 border-primary pl-2 mb-4'>
				{t('modes_title').toUpperCase()}
			</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
				{
					data.global_stats.solo ?
						<ModeItem mode={'SOLOS'} data={data.global_stats.solo} />
						: null
				}
				{
					data.global_stats.duo ?
						<ModeItem mode={'DUOS'} data={data.global_stats.duo} />
						: null
				}
				{
					data.global_stats.trio ?
						<ModeItem mode={'TRIOS'} data={data.global_stats.trio} />
						: null
				}
				{
					data.global_stats.squad ?
						<ModeItem mode={'SQUADS'} data={data.global_stats.squad} />
						: null
				}
			</div>
		</div>


	)
}

export default ModesStats
