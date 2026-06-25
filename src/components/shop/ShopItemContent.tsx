'use client'

import Image from 'next/image'
import { LikeButton } from '@/components/like/LikeButton'
import { CosmeticItemShell } from '@/components/locker/CosmeticItemShell'
import type { ShopEntry } from '@/types/fnapi'
import { fixImageWidth } from '@/utils'
import { entryCosmeticId, entryCosmeticName, entryImage } from '@/utils/cosmetic'

interface ShopItemContentProps {
	entry: ShopEntry
	likeLabel: string
	unlikeLabel: string
}

export function ShopItemContent({
	entry,
	likeLabel,
	unlikeLabel
}: ShopItemContentProps) {
	const itemId = entryCosmeticId(entry)
	const name = entryCosmeticName(entry)
	const itemImg = fixImageWidth(entryImage(entry), 400)

	return (
		<CosmeticItemShell
			instanceId={entry.offerId}
			cosmeticId={itemId}
			name={name}
			imageUrl={itemImg}
			overlay={
				<p className=':uno: text-primary flex justify-center items-center gap-1 text-xs font-semibold mt-0.5'>
					{entry.finalPrice}
					<Image
						src='/images/v-bucks.webp'
						width={16}
						height={16}
						className=':uno: h-4 w-auto'
						alt='v-bucks'
					/>
				</p>
			}
			actions={
				<LikeButton
					itemId={itemId}
					itemName={name}
					likeLabel={likeLabel}
					unlikeLabel={unlikeLabel}
					className=':uno: absolute top-2 right-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-void/70 text-muted backdrop-blur-sm hover:border-red-500/40 transition-colors cursor-pointer'
				/>
			}
		/>
	)
}
