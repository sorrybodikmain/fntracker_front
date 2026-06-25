'use client'

import Image from 'next/image'
import { LikeButton } from '@/components/like/LikeButton'
import { CosmeticItemShell } from '@/components/locker/CosmeticItemShell'
import type { BRCosmetic } from '@/types/fnapi'
import { fixImageWidth } from '@/utils'
import { cosmeticDisplayImage } from '@/utils/cosmetic'

interface CosmeticItemProps {
	cosmetic: BRCosmetic
	instanceId: string
	likeLabel: string
	unlikeLabel: string
}

export function CosmeticItem({
	cosmetic,
	instanceId,
	likeLabel,
	unlikeLabel
}: CosmeticItemProps) {
	const itemImg = fixImageWidth(cosmeticDisplayImage(cosmetic), 400)

	return (
		<CosmeticItemShell
			instanceId={instanceId}
			cosmeticId={cosmetic.id}
			name={cosmetic.name ?? cosmetic.id}
			imageUrl={itemImg}
			overlay={
				<p className=':uno: text-center text-xs text-primary mt-0.5'>
					{cosmetic.rarity?.displayValue ?? ''}
				</p>
			}
			actions={
				<LikeButton
					itemId={cosmetic.id}
					itemName={cosmetic.name ?? cosmetic.id}
					likeLabel={likeLabel}
					unlikeLabel={unlikeLabel}
					className=':uno: flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-void/80 text-muted shadow-[0_2px_12px_rgba(0,0,0,0.45)] hover:border-red-500/50 hover:text-red-400 transition-colors cursor-pointer'
				/>
			}
		/>
	)
}
