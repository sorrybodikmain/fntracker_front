'use client'

import Link from 'next/link'
import Image from 'next/image'
import { LikeButton } from '@/components/like/LikeButton'
import type { BRCosmetic } from '@/types/fnapi'
import { fixImageWidth } from '@/utils'
import { cosmeticDisplayImage } from '@/utils/cosmetic'

interface CosmeticItemProps {
	cosmetic: BRCosmetic
	likeLabel: string
	unlikeLabel: string
}

export function CosmeticItem({
	cosmetic,
	likeLabel,
	unlikeLabel
}: CosmeticItemProps) {
	const itemImg = fixImageWidth(cosmeticDisplayImage(cosmetic), 400)

	return (
		<div className=':uno: relative overflow-hidden rounded-lg hover:scale-[1.02] transition'>
			<Link href={`/locker/${cosmetic.id}`}>
				<div className=':uno: relative w-full h-44 sm:h-56'>
					{itemImg ? (
						<Image
							src={itemImg}
							alt={cosmetic.name ?? cosmetic.id}
							fill
							className=':uno: mx-auto hover:scale-[1.1] block transition-all object-cover'
							sizes='(max-width: 640px) 50vw, 200px'
						/>
					) : null}
				</div>
			</Link>
			<LikeButton
				itemId={cosmetic.id}
				itemName={cosmetic.name ?? cosmetic.id}
				likeLabel={likeLabel}
				unlikeLabel={unlikeLabel}
				className=':uno: absolute top-0 right-0 text-4xl p-2'
			/>
			<div className=':uno: absolute text-xs sm:text-sm bottom-0 w-full p-1.5 bg-gray-600'>
				<h1 className=':uno: text-center text-gray-100 px-1 pb-1'>
					{cosmetic.name ?? cosmetic.id}
				</h1>
				<p className=':uno: text-center text-gray-400'>
					{cosmetic.rarity?.displayValue ?? ''}
				</p>
			</div>
		</div>
	)
}
