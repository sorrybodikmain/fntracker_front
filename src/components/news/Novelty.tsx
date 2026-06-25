'use client'

import { useLocale } from 'next-intl'
import type { BRNewsMotd, BRNewsMessage } from '@/types/fnapi'
import { ZoomableImage } from '@/components/shared/ZoomableImage'
import { Card } from '@/components/ui/Card'
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
		<Card className=':uno: p-4'>
			<div className=':uno: flex flex-col md:flex-row gap-4'>
				{image ? (
					<div
						className=':uno: w-full md:w-4/12 shrink-0 overflow-hidden rounded-lg cursor-pointer'
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
				<div className=':uno: flex-1'>
					<h5 className=':uno: font-display text-lg mb-2 text-foreground'>
						{title}
					</h5>
					<p className=':uno: text-sm text-muted leading-relaxed'>{body}</p>
					{date ? (
						<p className=':uno: mt-3 text-xs text-muted/70'>
							{new Date(date).toLocaleDateString(locale)}
						</p>
					) : null}
				</div>
			</div>
		</Card>
	)
}
