'use client'

import type { INovelty } from '@/interfaces'
import { fixImageWidth, logEvent } from '@/utils'
import { ZoomableImage } from '@/components/shared/ZoomableImage'

interface NoveltyProps {
	data: INovelty
}

export function Novelty({ data }: NoveltyProps) {
	return (
		<div className=':uno: flex flex-wrap bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition'>
			<div
				className=':uno: relative bg-cover w-full md:w-4/12 max-h-[18rem] md:max-h-[14rem] mb-3 sm:mb-0'
				onClick={() => logEvent('News', 'View', data.title)}
			>
				<ZoomableImage
					src={fixImageWidth(data.image, 360)}
					alt='post-image'
					width={360}
					height={240}
					className=':uno: object-cover w-full h-full rounded-lg'
				/>
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
