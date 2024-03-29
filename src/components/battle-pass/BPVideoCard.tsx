import { FC, PropsWithChildren } from 'react'
import { BPVideo } from '@/interfaces'
import { useTranslation } from 'react-i18next'

interface IBPCard {
	videos: BPVideo[]
}

const BPVideoCard: FC<PropsWithChildren<IBPCard>> = ({ videos }) => {
	const { t } = useTranslation('battle-pass')

	return (
		<>
			<div className=':uno: container text-white mx-auto mt-3 mb-2'>
				<h1 className=':uno: border-l-4 border-primary pl-2 mb-4'>
					{t('videos_card_title').toUpperCase()}
				</h1>
				<div className=':uno: flex flex-wrap rounded-lg p-3 hover:scale-[1.01] transition bg-gray-600'>
					<div className=':uno: flex flex-wrap'>
						{videos.map((video, index) => (
							<div className=':uno: flex flex-wrap w-full sm:w-1/3 my-1' key={index}>
								<video className=':uno: w-full rounded-lg px-1' controls>
									<source src={video.url} type='video/mp4' />
								</video>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default BPVideoCard
