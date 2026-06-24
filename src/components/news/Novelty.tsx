'use client'

import { useLocale } from 'next-intl'
import type { BRNewsMotd, BRNewsMessage } from '@/types/fnapi'
import { ZoomableImage } from '@/components/shared/ZoomableImage'
import { fixNewsImage } from '@/utils'
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
					className=':uno: w-full md:w-4/12 mb-3 md:mb-0 shrink-0 overflow-hidden rounded-lg'
					onClick={() => logEvent('News', 'View', title)}
				>
					<ZoomableImage
						src={fixNewsImage(image, 480)}
						alt={title}
						width={480}
						height={240}
						className=':uno: w-full h-auto object-cover rounded-lg'
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
