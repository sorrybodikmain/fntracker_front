import Image from 'next/image'
import type { Banner } from '@/types/fnapi'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface BannerCardProps {
	banner: Banner
}

export function BannerCard({ banner }: BannerCardProps) {
	const icon = banner.images?.icon ?? banner.images?.smallIcon ?? null

	return (
		<Card hover className=':uno: p-4 text-center'>
			<div className=':uno: relative w-full h-20 mb-3'>
				{icon ? (
					<Image
						src={icon}
						alt={banner.name ?? banner.id}
						fill
						className=':uno: object-contain'
						sizes='80px'
					/>
				) : null}
			</div>
			<h2 className=':uno: text-sm font-medium text-foreground truncate'>
				{banner.name ?? banner.id}
			</h2>
			{banner.rarity?.displayValue ? (
				<Badge variant='primary' className=':uno: mt-2'>
					{banner.rarity.displayValue}
				</Badge>
			) : null}
		</Card>
	)
}
