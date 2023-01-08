import { FC, PropsWithChildren } from 'react'
import { PrStats } from '@/api/types/user-stats.type'
import { useTranslation } from 'react-i18next'

const EventsStats: FC<PropsWithChildren<{ data: PrStats }>> = ({ data }) => {
	const { t } = useTranslation('stats')
	return (
		<div className='container text-white mx-auto p-3'>
			<h2 className='border-l-4 border-primary pl-2 mb-4'>
				{t('events_title').toUpperCase()}
			</h2>
			<div className='flex flex-wrap bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition'>
				<div className='relative w-full px-1 mb-4 md:mb-0 mr-auto text-gray-500'>
					<div className='grid grid-cols-2 gap-2'>
						<p className='inline-flex flex-col'>
							{t('events_current_pr')}
							<span className='font-bold text-lg text-gray-300 -mt-2'>{data.points || 0}</span>
						</p>
						<p className='inline-flex flex-col'>
							{t('events_earnings')}
							<span className='font-bold text-lg text-gray-300 -mt-2'>${data.cashPrize || 0}</span>
						</p>
						<p className='inline-flex flex-col'>
							{t('events_total')}
							<span className='text-gray-300'>{data.events || 0}</span>
						</p>
						<p className='inline-flex flex-col'>
							{t('events_rank')}
							<span className='text-gray-300'>#{data.rank || 0}</span>
						</p>
					</div>

				</div>
			</div>
		</div>
	)
}

export default EventsStats
