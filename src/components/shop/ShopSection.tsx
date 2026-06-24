import { getTranslations } from 'next-intl/server'
import { ShopItem } from './ShopItem'
import type { ShopEntry } from '@/types/fnapi'
import { entryCosmeticName, entryLayoutId, entryLayoutName } from '@/utils/cosmetic'

interface ShopSectionProps {
	entries: ShopEntry[]
	sectionId?: string
	sectionName?: string
	likeLabel?: string
	unlikeLabel?: string
}

export async function ShopSection({
	entries,
	sectionId,
	sectionName,
	likeLabel,
	unlikeLabel
}: ShopSectionProps) {
	const t = await getTranslations('shop')
	const filtered = sectionId
		? entries.filter(entry => entryLayoutId(entry) === sectionId)
		: entries

	const sectionEntry = entries.find(
		entry => entryLayoutId(entry) === sectionId
	)
	const resolvedSectionName =
		sectionName ?? (sectionEntry ? entryLayoutName(sectionEntry) : undefined)

	return (
		<>
			<h1 className=':uno: border-l-4 border-primary text-md pl-2 my-4'>
				{resolvedSectionName}
			</h1>
			<div className=':uno: grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-6'>
				{filtered.map((entry, index) => {
					const name = entryCosmeticName(entry)
					return (
						<ShopItem
							key={`${entry.offerId}-${index}`}
							entry={entry}
							likeLabel={likeLabel ?? t('like_item', { name })}
							unlikeLabel={unlikeLabel ?? t('unlike_item', { name })}
						/>
					)
				})}
			</div>
		</>
	)
}
