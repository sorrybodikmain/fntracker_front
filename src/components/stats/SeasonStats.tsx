import { FC, PropsWithChildren } from 'react'
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'
import { useTranslation } from 'react-i18next'
import { AccountStatsResponse } from '@/interfaces/user-stats.interface.ts'

const SeasonStats: FC<PropsWithChildren<{ data: AccountStatsResponse }>> = ({
	data
}) => {
	const { t } = useTranslation('stats')
	return (
		<div className=':uno: container text-white mx-auto p-3'>
			<h1 className=':uno: border-l-4 border-primary pl-2 mb-4'>
				{t('seasons_title').toUpperCase()}
			</h1>
			<div className=':uno: bg-gray-600 rounded-lg p-3 transition hover:scale-[1.01] h-96'>
				<ResponsiveContainer width='100%' height='100%' className=':uno: -ml-4'>
					<LineChart data={data.accountLevelHistory}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='season' name='Season:' />
						<YAxis />
						<Tooltip labelClassName=':uno: text-primary' />
						<Legend />
						<Line type='monotone' dataKey='level' stroke='#4F75FB' />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

export default SeasonStats
