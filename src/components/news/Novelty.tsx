'use client'

import { useLocale } from 'next-intl'
import type { BRNewsMotd, BRNewsMessage } from '@/types/fnapi'
import { ZoomableImage } from '@/components/shared/ZoomableImage'
import { fixImageWidth } from '@/utils'
import { logEvent } from '@/utils/gtag.utils'

interface NoveltyProps {
	item: BRNewsMotd | BRNewsMessage
	date?: string
}

export function Novelty({ item, date }: NoveltyProps) {
	const locale = useLocale()
	const title = item.title
	const body = item.body
	const image = item.image

	return (
		<div className=':uno: flex flex-wrap bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition'>
			{image ? (
				<div
					className=':uno: relative bg-cover w-full md:w-4/12 max-h-[18rem] md:max-h-[14rem] mb-3 sm:mb-0'
					onClick={() => logEvent('News', 'View', title)}
				>
					<ZoomableImage
						src={fixImageWidth(image, 360)}
						alt={title}
						width={360}
						height={240}
						className=':uno: object-cover w-full h-full rounded-lg'
					/>
				</div>
			) : null}
			<div className=':uno: w-full md:w-8/12 xl:w-6/12 px-3 mb-4 md:mb-0 mr-auto'>
				<h5 className=':uno: text-lg mb-2'>{title}</h5>
				<p className=':uno: text-gray-300'>{body}</p>
				{date && (
					<p className=':uno: text-gray-500'>
						{new Date(date).toLocaleDateString(locale)}
					</p>
				)}
			</div>
		</div>
	)
}
