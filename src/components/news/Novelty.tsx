import { FC, PropsWithChildren } from 'react'
import { INovelty } from '@/interfaces'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import styles from '@/styles/Zoom.module.css'
import Zoom from 'react-medium-image-zoom'
import { fixImageWidth, logEvent } from '@/utils'

const Novelty: FC<PropsWithChildren<{ data: INovelty }>> = ({ data }) => {
	return (
		<div className=':uno: flex flex-wrap bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition'>
			<div
				className=':uno: relative bg-cover w-full md:w-4/12 mb-3 sm:mb-0'
				onClick={() => logEvent('News', 'View', data.title)}
			>
				<Zoom classDialog={styles.zoom}>
					<LazyLoadImage
						src={fixImageWidth(data.image, 360)}
						alt='post-image'
						className=':uno: object-cover w-full h-full rounded-lg'
					/>
				</Zoom>
			</div>
			<div className=':uno: w-full md:w-8/12 xl:w-6/12 px-3 mb-4 md:mb-0 mr-auto'>
				<h5 className=':uno: text-lg mb-2'>{data.title}</h5>
				<p className=':uno: text-gray-300'>{data.body}</p>
				<p className=':uno: text-gray-500'>
					{new Date(data.date).toLocaleDateString()}
				</p>
			</div>
		</div>
	)
}

export default Novelty
