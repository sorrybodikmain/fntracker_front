'use client'

import Image from 'next/image'
import { CosmeticItemShell } from '@/components/locker/CosmeticItemShell'
import type { ShopEntry } from '@/types/fnapi'
import { fixImageWidth } from '@/utils'
import { entryCosmeticId, entryCosmeticName, entryImage } from '@/utils/cosmetic'

interface MiniItemProps {
	entry: ShopEntry
}

export function MiniItem({ entry }: MiniItemProps) {
	const itemId = entryCosmeticId(entry)
	const name = entryCosmeticName(entry)
	const itemImg = fixImageWidth(entryImage(entry), 400)

	return (
		<CosmeticItemShell
			instanceId={entry.offerId}
			cosmeticId={itemId}
			name={name}
			imageUrl={itemImg}
			aspect='square'
			overlay={
				<p className=':uno: text-primary flex justify-center items-center gap-1 text-xs font-semibold'>
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
		/>
	)
}
