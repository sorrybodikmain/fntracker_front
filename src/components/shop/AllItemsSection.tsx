import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { ItemShop } from '@/types/shop.type'
import ShopItem from '@/components/shop/ShopItem'
import usePageBottom from '@/hooks/usePageBottom'
import { useDebounce } from '@/hooks/useDebounce'
import { useTranslation } from 'react-i18next'
import { logEvent } from '@/libs/gtag.utils'

const AllItemsSection: FC<PropsWithChildren<IAllItemsSectionProps>> = ({
	items
}) => {
	const { t } = useTranslation('shop')

	const [filter, setFilter] = useState<string>('')
	const debounced = useDebounce<string>(filter, 1000)

	const [currPos, setCurrPos] = useState<number>(20)
	const [showedItems, setShowedItems] = useState<ItemShop[]>(
		items.slice(0, currPos)
	)
	const bottom = usePageBottom()

	useEffect(() => {
		if (debounced.length === 0) {
			setCurrPos(currPos + 20)
			setShowedItems(items.slice(0, currPos))
		}
	}, [bottom])

	useEffect(() => {
		if (debounced.length > 3) {
			logEvent('Shop', 'Search', `SearchTerm-${debounced}`)
			const filteredItems = items.filter(i =>
				i.name.toLowerCase().includes(filter.toLowerCase())
			)
			if (filteredItems.length !== 0) setShowedItems(filteredItems)
		} else setShowedItems(items.slice(0, currPos))
	}, [debounced])

	return (
		<>
			<div className='container mx-auto text-white p-3 min-h-screen'>
				<h1 className='border-l-4 border-primary text-lg pl-2 my-4'>
					{t('items_title')}
				</h1>

				<div className='relative text-sm my-3'>
					<form>
						<input
							type='text'
							value={filter}
							onChange={e => setFilter(e.target.value)}
							placeholder={t('filter_placeholder')!}
							className='w-full h-9 bg-gray-700 rounded-lg p-2 hover:bg-gray-600 transition'
						/>
					</form>
				</div>

				<div className='grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-6'>
					{showedItems.map((item, index) => (
						<ShopItem key={index} data={item} />
					))}
				</div>
			</div>
		</>
	)
}

interface IAllItemsSectionProps {
	items: ItemShop[]
}

export default AllItemsSection
