import { getTranslations } from 'next-intl/server'
import type { ModeStats } from '@/types/fnapi'

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

	return (
		<div className=':uno: relative mx-auto w-full ease-in-out hover:scale-[1.01] transition'>
			<div className=':uno: relative inline-block w-full'>
				<div className=':uno: absolute w-full rounded-t-xl flex justify-between px-2 py-1 bg-primary'>
					<p className=':uno: font-bold'>{mode}</p>
					<p className=':uno: right-0'>
						{data.matches} {t('modes_matches_played')}
					</p>
				</div>
				<div className=':uno: p-4 rounded-lg bg-gray-600'>
					<div className=':uno: grid grid-cols-2 grid-rows-2 gap-4 mt-6'>
						<p className=':uno: inline-flex flex-col border-b-2 border-primary'>
							WINS
							<span className=':uno: mt-1 xl:mt-0'>{data.wins}</span>
						</p>
						<p className=':uno: inline-flex flex-col border-b-2 border-primary'>
							KILLS
							<span className=':uno: mt-1 xl:mt-0'>{data.kills}</span>
						</p>
						<p className=':uno: inline-flex flex-col border-b-2 border-primary'>
							WIN %
							<span className=':uno: mt-1 xl:mt-0'>{data.winRate}</span>
						</p>
						<p className=':uno: inline-flex flex-col border-b-2 border-primary'>
							K/D
							<span className=':uno: mt-1 xl:mt-0'>{data.kd}</span>
						</p>
						<p className=':uno: inline-flex flex-col border-b-2 border-primary'>
							TOP 10
							<span className=':uno: mt-1 xl:mt-0'>{topHigh}</span>
						</p>
						<p className=':uno: inline-flex flex-col border-b-2 border-primary'>
							TOP 25
							<span className=':uno: mt-1 xl:mt-0'>{topLow}</span>
						</p>
						<p className=':uno: inline-flex flex-col border-b-2 border-primary'>
							TIME PLAYED
							<span className=':uno: mt-1 xl:mt-0'>{data.minutesPlayed}</span>
						</p>
						<p className=':uno: inline-flex flex-col border-b-2 border-primary'>
							AVG. MATCH TIME
							<span className=':uno: mt-1 xl:mt-0'>
								{data.matches
									? Math.floor(data.minutesPlayed / data.matches)
									: 0}{' '}
								min.
							</span>
						</p>
						<p className=':uno: inline-flex flex-col border-b-2 border-primary'>
							KILLS/MATCH
							<span className=':uno: mt-1 xl:mt-0'>
								{data.matches ? Math.floor(data.kills / data.matches) : 0}
							</span>
						</p>
						<p className=':uno: inline-flex flex-col border-b-2 border-primary'>
							KILLS/MIN
							<span className=':uno: mt-1 xl:mt-0'>
								{data.minutesPlayed
									? Math.floor(data.kills / data.minutesPlayed)
									: 0}
							</span>
						</p>
						<p className=':uno: inline-flex flex-col border-b-2 border-primary'>
							SCORE/MATCH
							<span className=':uno: mt-1 xl:mt-0'>
								{data.matches ? Math.floor(data.score / data.matches) : 0}
							</span>
						</p>
						<p className=':uno: inline-flex flex-col border-b-2 border-primary'>
							SCORE/MIN
							<span className=':uno: mt-1 xl:mt-0'>
								{data.minutesPlayed
									? Math.floor(data.score / data.minutesPlayed)
									: 0}
							</span>
						</p>
						<p className=':uno: inline-flex flex-col border-b-2 border-primary'>
							SCORE
							<span className=':uno: mt-1 xl:mt-0'>{data.score}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
