import { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { PrStats } from '@/interfaces/user-stats.interface.ts'

interface IEventStatsProps {
	data?: PrStats
}

const EventsStats: FC<PropsWithChildren<IEventStatsProps>> = ({ data }) => {
	const { t } = useTranslation('stats')
	return (
		<div className=':uno: container text-white mx-auto p-3'>
			<h1 className=':uno: border-l-4 border-primary pl-2 mb-4'>
				{t('events_title').toUpperCase()}
			</h1>
			<div className=':uno: flex bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition'>
				<div className=':uno: relative w-full px-1 mb-4 md:mb-0 mr-auto text-gray-500'>
					<div className=':uno: grid grid-cols-2 gap-2'>
						<p className=':uno: inline-flex flex-col'>
							{t('events_current_pr')}
							<span className=':uno: font-bold text-lg text-gray-300 -mt-2'>
								{data?.points || 0}
							</span>
						</p>
						<p className=':uno: inline-flex flex-col'>
							{t('events_earnings')}
							<span className=':uno: font-bold text-lg text-gray-300 -mt-2'>
								${data?.cashPrize || 0}
							</span>
						</p>
						<p className=':uno: inline-flex flex-col'>
							{t('events_total')}
							<span className=':uno: text-gray-300'>{data?.events || 0}</span>
						</p>
						<p className=':uno: inline-flex flex-col'>
							{t('events_rank')}
							<span className=':uno: text-gray-300'>#{data?.rank || 0}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EventsStats
