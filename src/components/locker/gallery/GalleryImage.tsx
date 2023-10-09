import { FC, PropsWithChildren } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import styles from '@/styles/Zoom.module.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { fixImageWidth } from '@/utils/api.utils'

const GalleryImage: FC<PropsWithChildren<{ src: string }>> = ({ src }) => {
	return (
		<div className=':uno: flex flex-wrap w-1/6'>
			<div className=':uno: w-full p-1 md:p-2'>
				<Zoom classDialog={styles.zoom}>
					<LazyLoadImage
						alt='gallery'
						className=':uno: block object-cover object-center w-full h-full rounded-lg'
						src={fixImageWidth(src, 500)}
					/>
				</Zoom>
			</div>
		</div>
	)
}

export default GalleryImage
