import Image from 'next/image'
import type { Banner } from '@/types/fnapi'

interface BannerCardProps {
	banner: Banner
}

export function BannerCard({ banner }: BannerCardProps) {
	const icon = banner.images?.icon ?? banner.images?.smallIcon ?? null

	return (
		<div className=':uno: rounded-lg overflow-hidden bg-gray-600 hover:scale-[1.02] transition p-3'>
			<div className=':uno: relative w-full h-20 mb-2'>
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
			<h2 className=':uno: text-white text-sm text-center'>
				{banner.name ?? banner.id}
			</h2>
			<p className=':uno: text-gray-400 text-xs text-center mt-1'>
				{banner.rarity?.displayValue ?? ''}
			</p>
		</div>
	)
}
