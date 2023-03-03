import { FC, PropsWithChildren } from 'react'
import { BPVideo } from '@/types/battle-pass.types'
import { useTranslation } from 'react-i18next'

interface IBPCard {
	videos: BPVideo[]
}

const BPVideoCard: FC<
	PropsWithChildren<IBPCard>
> = ({ videos }) => {
	const { t } = useTranslation('battle-pass')

	return <>
		<div className='container text-white mx-auto mt-3 mb-2'>
			<h1 className='border-l-4 border-primary pl-2 mb-4'>
				{t('videos_card_title').toUpperCase()}
			</h1>
			<div
				className='flex flex-wrap rounded-lg p-3 hover:scale-[1.01] transition bg-gray-600'>

				<div className='flex flex-wrap mt-2'>
					{videos.map((video, index) => (
						<div className='flex flex-wrap w-1/2' key={index}>
							<video className='w-full rounded-lg px-1' controls>
								<source src={video.url} type='video/mp4' />
							</video>
						</div>
					))}
				</div>
			</div>
		</div>
	</>
}

export default BPVideoCard
