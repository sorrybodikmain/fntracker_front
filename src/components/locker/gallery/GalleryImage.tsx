'use client'

import { ZoomableImage } from '@/components/shared/ZoomableImage'
import { fixImageWidth } from '@/utils'

interface GalleryImageProps {
	src: string
}

export function GalleryImage({ src }: GalleryImageProps) {
	return (
		<div className=':uno: flex flex-wrap w-1/6'>
			<div className=':uno: w-full p-1 md:p-2'>
				<ZoomableImage
					src={fixImageWidth(src, 500)}
					alt='gallery'
					width={500}
					height={500}
					className=':uno: block object-cover object-center w-full h-full rounded-lg'
				/>
			</div>
		</div>
	)
}
