'use client'

import { useEffect, useState } from 'react'
import type { BRCosmetic } from '@/types/fnapi'
import { useDebounce } from '@/hooks/useDebounce'
import { usePageBottom } from '@/hooks/usePageBottom'
import { useTranslations } from 'next-intl'
import { logEvent } from '@/utils/gtag.utils'
import { CosmeticItem } from './CosmeticItem'

interface AllItemsSectionProps {
	cosmetics: BRCosmetic[]
}

export function AllItemsSection({ cosmetics }: AllItemsSectionProps) {
	const t = useTranslations('shop')
	const [filter, setFilter] = useState('')
	const debounced = useDebounce<string>(filter, 1000)
	const [currPos, setCurrPos] = useState(20)
	const [showedItems, setShowedItems] = useState(cosmetics.slice(0, currPos))
	const bottom = usePageBottom()

	useEffect(() => {
		if (debounced.length === 0) {
			setCurrPos(prev => prev + 20)
			setShowedItems(cosmetics.slice(0, currPos))
		}
	}, [bottom, cosmetics, currPos, debounced.length])

	useEffect(() => {
		if (debounced.length > 3) {
			logEvent('Shop', 'Search', `SearchTerm-${debounced}`)
			const filteredItems = cosmetics.filter(i =>
				i.name.toLowerCase().includes(filter.toLowerCase())
			)
			if (filteredItems.length !== 0) setShowedItems(filteredItems)
		} else {
			setShowedItems(cosmetics.slice(0, currPos))
		}
	}, [cosmetics, currPos, debounced, filter])

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
				{showedItems.map((cosmetic, index) => (
					<CosmeticItem
						key={`${cosmetic.id}-${index}`}
						cosmetic={cosmetic}
						likeLabel={t('like_item', { name: cosmetic.name })}
						unlikeLabel={t('unlike_item', { name: cosmetic.name })}
					/>
				))}
			</div>
		</div>
	)
}
