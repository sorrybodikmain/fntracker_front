import BPCardProgressBar from '@/components/battle-pass/bpcard/BPCardProgressBar'
import { IBattlePassResponse } from '@/types/battle-pass.types'
import { fillMassive } from '@/utils/api.utils'
import { useTranslation } from 'react-i18next'
import { FC, PropsWithChildren } from 'react'
import { logEvent } from '@/libs/gtag.utils'
import { useNavigate } from 'react-router'

interface IBPCard {
	data: IBattlePassResponse
}

const BPCard: FC<PropsWithChildren<IBPCard>> = ({ data }) => {
	const { t } = useTranslation('battle-pass')
	const navigate = useNavigate()
	const versions = fillMassive(2, 26)
	const version = data.season || 23
	const handleVersion = (e: any) => {
		navigate('/battle-pass/' + e.target.value)
		logEvent('Battle-Pass', 'Change', `To-${e.target.value}`)
	}

	return (
		<div className='container text-white mx-auto'>
			<div className='flex justify-between'>
				<h1 className='border-l-4 border-primary pl-2 mb-4'>
					{t('bp_card_title').toUpperCase()}
				</h1>
				<select
					className='bg-gray-800 rounded-lg text-xs h-min'
					onChange={handleVersion}
					value={version}
				>
					{versions.map((item, index) => (
						<option key={index} value={item}>
							{item}
						</option>
					))}
				</select>
			</div>
			<div className='flex flex-wrap rounded-lg p-3 hover:scale-[1.01] transition bg-gray-600'>
				<h2 className='text-md uppercase'>{t('bp_details')}</h2>
				<div className='w-full text-gray-500'>
					<p className='inline-flex font-bold text-lg text-gray-300'>
						{data.displayInfo.chapterSeason}
					</p>
				</div>
				<BPCardProgressBar dates={data.seasonDates} />
			</div>
		</div>
	)
}

export default BPCard
