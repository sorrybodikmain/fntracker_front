import { ShopItemContent } from './ShopItemContent'
import type { ShopEntry } from '@/types/fnapi'

interface ShopItemProps {
	entry: ShopEntry
	likeLabel: string
	unlikeLabel: string
}

export function ShopItem({ entry, likeLabel, unlikeLabel }: ShopItemProps) {
	return (
		<ShopItemContent
			entry={entry}
			likeLabel={likeLabel}
			unlikeLabel={unlikeLabel}
		/>
	)
}
