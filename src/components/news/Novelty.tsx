import { FC, PropsWithChildren } from 'react'
import { INovelty } from '@/types/posts.type'
import { fixImageWidth } from '@/utils/api.utils'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import styles from '@/styles/Zoom.module.css'
import Zoom from 'react-medium-image-zoom'

const Novelty: FC<PropsWithChildren<{ data: INovelty }>> = ({ data }) => {
	return (
		<div className='flex flex-wrap bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition'>
			<div className='relative bg-cover w-full md:w-4/12 mb-3 sm:mb-0'>
				<Zoom classDialog={styles.zoom}>
					<LazyLoadImage
						src={fixImageWidth(data.image, 360)}
						alt='post-image'
						className='object-cover w-full h-full rounded-lg'
					/>
				</Zoom>
			</div>
			<div className='w-full md:w-8/12 xl:w-6/12 px-3 mb-4 md:mb-0 mr-auto'>
				<h5 className='text-lg mb-2'>{data.title}</h5>
				<p className='text-gray-300'>{data.body}</p>
				<p className='text-gray-500'>{new Date(data.date).toLocaleDateString()}</p>
			</div>
		</div>
	)
}

export default Novelty