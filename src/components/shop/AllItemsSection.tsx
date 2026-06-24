'use client'

import { useEffect, useState } from 'react'
import type { ItemShop } from '@/interfaces'
import { ShopItemContent } from '@/components/shop/ShopItemContent'
import usePageBottom from '@/hooks/usePageBottom'
import { useDebounce } from '@/hooks/useDebounce'
import { useTranslations } from 'next-intl'
import { logEvent } from '@/utils/gtag.utils'

interface AllItemsSectionProps {
	items: ItemShop[]
}

export function AllItemsSection({ items }: AllItemsSectionProps) {
	const t = useTranslations('shop')
	const [filter, setFilter] = useState('')
	const debounced = useDebounce<string>(filter, 1000)
	const [currPos, setCurrPos] = useState(20)
	const [showedItems, setShowedItems] = useState<ItemShop[]>(items.slice(0, 20))
	const bottom = usePageBottom()

	useEffect(() => {
		if (debounced.length === 0 && bottom) {
			setCurrPos(prev => {
				const next = prev + 20
				setShowedItems(items.slice(0, next))
				return next
			})
		}
	}, [bottom, debounced.length, items])

	useEffect(() => {
		if (debounced.length > 3) {
			logEvent('Shop', 'Search', `SearchTerm-${debounced}`)
			const filteredItems = items.filter(i =>
				i.name.toLowerCase().includes(filter.toLowerCase())
			)
			if (filteredItems.length !== 0) setShowedItems(filteredItems)
		} else {
			setShowedItems(items.slice(0, currPos))
		}
	}, [debounced, currPos, filter, items])

	return (
		<div className=':uno: container mx-auto text-white p-3 min-h-screen'>
			<h1 className=':uno: border-l-4 border-primary text-lg pl-2 my-4'>
				{t('items_title')}
			</h1>

			<div className=':uno: relative text-sm my-3'>
				<form>
					<input
						type='text'
						value={filter}
						onChange={e => setFilter(e.target.value)}
						placeholder={t('filter_placeholder')}
						className=':uno: w-full h-9 bg-gray-700 rounded-lg p-2 hover:bg-gray-600 transition'
					/>
				</form>
			</div>

			<div className=':uno: grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-6'>
				{showedItems.map((item, index) => {
					const name = item.displayName || item.name
					return (
						<ShopItemContent
							key={index}
							data={item}
							likeLabel={t('like_item', { name })}
							unlikeLabel={t('unlike_item', { name })}
						/>
					)
				})}
			</div>
		</div>
	)
}
