import { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { BPSeasonDates } from '@/types/battle-pass.types'
import { getPercentByDates } from '@/utils/api.utils'

const BPCardProgressBar: FC<
	PropsWithChildren<{ dates: BPSeasonDates }
	>> = ({ dates }) => {

	const { t } = useTranslation('battle-pass')
	const percent = getPercentByDates(dates)

	return <>
		<div className='py-1 w-full'>
			<div className='flex mb-2 items-center justify-between'>
				<h2
					className='text-md uppercase'>
					{t('bp_progress')}
				</h2>
				<div className='text-right'>
						<span className='text-xs inline-block'>
							{percent > 100 ? 100 : percent} %
						</span>
				</div>
			</div>
			<div className='overflow-hidden h-4 text-xs flex rounded bg-blue-700 border-gray-700 border-[1px]'>
				<div
					style={{ width: `${percent}%` }}
					className='bg-primary' />
			</div>
			<div className='flex justify-between text-gray-300'>
				<p className='text-xs inline-block'>
					{new Date(dates.begin).toLocaleDateString()}
				</p>
				<p className='text-xs inline-block'>
					{new Date(dates.end).toLocaleDateString()}
				</p>
			</div>
		</div>
	</>
}

export default BPCardProgressBar
