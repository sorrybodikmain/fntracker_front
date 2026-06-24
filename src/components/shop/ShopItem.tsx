import { ShopItemContent } from './ShopItemContent'
import type { ItemShop } from '@/interfaces'

interface ShopItemProps {
	data: ItemShop
	likeLabel: string
	unlikeLabel: string
}

export function ShopItem({ data, likeLabel, unlikeLabel }: ShopItemProps) {
	return (
		<ShopItemContent
			data={data}
			likeLabel={likeLabel}
			unlikeLabel={unlikeLabel}
		/>
	)
}
