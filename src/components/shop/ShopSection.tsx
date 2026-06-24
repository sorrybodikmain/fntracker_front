import { getTranslations } from 'next-intl/server'
import { ShopItem } from './ShopItem'
import type { ItemShop } from '@/interfaces'

interface ShopSectionProps {
	items: ItemShop[]
	sectionId?: string
	sectionName?: string
	likeLabel?: string
	unlikeLabel?: string
}

export async function ShopSection({
	items,
	sectionId,
	sectionName,
	likeLabel,
	unlikeLabel
}: ShopSectionProps) {
	const t = await getTranslations('shop')
	const filtered = sectionId
		? items.filter(item => item.section.id === sectionId)
		: items

	const resolvedSectionName =
		sectionName ||
		items.find(item => item.section.id === sectionId)?.section.name

	return (
		<>
			<h1 className=':uno: border-l-4 border-primary text-md pl-2 my-4'>
				{resolvedSectionName}
			</h1>
			<div className=':uno: grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-6'>
				{filtered.map((item, index) => {
					const name = item.displayName || item.name
					return (
						<ShopItem
							key={index}
							data={item}
							likeLabel={
								likeLabel ?? t('like_item', { name })
							}
							unlikeLabel={
								unlikeLabel ?? t('unlike_item', { name })
							}
						/>
					)
				})}
			</div>
		</>
	)
}
