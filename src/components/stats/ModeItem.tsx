import { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseStats } from '@/interfaces/user-stats.interface.ts'

const ModeItem: FC<PropsWithChildren<{ data: BaseStats; mode: string }>> = ({
	data,
	mode
}) => {
	const { t } = useTranslation('stats')
	return (
		<div className=':uno: relative mx-auto w-full ease-in-out hover:scale-[1.01] transition'>
			<div className=':uno: relative inline-block w-full'>
				<div className=':uno: absolute w-full rounded-t-xl flex justify-between px-2 py-1 bg-primary'>
					<p className=':uno: font-bold'>{mode}</p>
					<p className=':uno: right-0'>
						{data.matchesplayed} {t('modes_matches_played')}
					</p>
				</div>
				<div className=':uno: p-4 rounded-lg bg-gray-600'>
					<div className=':uno: grid grid-cols-2 grid-rows-2 gap-4 mt-6'>
						<p className=':uno: inline-flex flex-col  border-b-2 border-primary'>
							WINS
							<span className=':uno: mt-1 xl:mt-0'>{data.placetop1}</span>
						</p>
						<p className=':uno: inline-flex flex-col  border-b-2 border-primary'>
							KILLS
							<span className=':uno: mt-1 xl:mt-0'>{data.kills}</span>
						</p>
						<p className=':uno: inline-flex flex-col  border-b-2 border-primary'>
							WIN %<span className=':uno: mt-1 xl:mt-0'>{data.winrate}</span>
						</p>
						<p className=':uno: inline-flex flex-col  border-b-2 border-primary'>
							K/D
							<span className=':uno: mt-1 xl:mt-0'>{data.kd}</span>
						</p>
						<p className=':uno: inline-flex flex-col  border-b-2 border-primary'>
							TOP 10
							<span className=':uno: mt-1 xl:mt-0'>{data.placetop10}</span>
						</p>
						<p className=':uno: inline-flex flex-col  border-b-2 border-primary'>
							TOP 25
							<span className=':uno: mt-1 xl:mt-0'>{data.placetop25}</span>
						</p>
						<p className=':uno: inline-flex flex-col  border-b-2 border-primary'>
							TIME PLAYED
							<span className=':uno: mt-1 xl:mt-0'>{data.minutesplayed}</span>
						</p>
						<p className=':uno: inline-flex flex-col  border-b-2 border-primary'>
							AVG. MATCH TIME
							<span className=':uno: mt-1 xl:mt-0'>
								{Math.floor(data.minutesplayed / data.matchesplayed)} min.
							</span>
						</p>
						<p className=':uno: inline-flex flex-col  border-b-2 border-primary'>
							KILLS/MATCH
							<span className=':uno: mt-1 xl:mt-0'>
								{Math.floor(data.kills / data.matchesplayed)}
							</span>
						</p>
						<p className=':uno: inline-flex flex-col border-b-2 border-primary'>
							KILLS/MIN
							<span className=':uno: mt-1 xl:mt-0'>
								{Math.floor(data.kills / data.minutesplayed)}
							</span>
						</p>
						<p className=':uno: inline-flex flex-col  border-b-2 border-primary'>
							SCORE/MATCH
							<span className=':uno: mt-1 xl:mt-0'>
								{Math.floor(data.score / data.matchesplayed)}
							</span>
						</p>
						<p className=':uno: inline-flex flex-col  border-b-2 border-primary'>
							SCORE/MIN
							<span className=':uno: mt-1 xl:mt-0'>
								{Math.floor(data.score / data.minutesplayed)}
							</span>
						</p>
						<p className=':uno: inline-flex flex-col  border-b-2 border-primary'>
							SCORE
							<span className=':uno: mt-1 xl:mt-0'>{data.score}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ModeItem
