import { FC, PropsWithChildren } from 'react'
import ShopItem from './ShopItem'
import { ItemShop } from '@/interfaces/shop.interface.ts'
import { logEvent } from '@/utils/gtag.utils'

interface IShopSectionProps {
	items: ItemShop[]
	sectionId?: string
	sectionName?: string
}

const ShopSection: FC<PropsWithChildren<IShopSectionProps>> = ({
	items,
	sectionId,
	sectionName
}) => {
	return (
		<>
			<h1 className=':uno: border-l-4 border-primary text-md pl-2 my-4'>
				{sectionName ||
					items.find(item => item.section.id === sectionId)?.section.name}
			</h1>
			<div
				className=':uno: grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-6'
				onClick={() => logEvent('Shop', 'Click', `Shop-Section-${sectionName}`)}
			>
				{sectionId
					? items
							.filter(item => item.section.id === sectionId)
							.map((item, index) => <ShopItem key={index} data={item} />)
					: items.map((item, index) => <ShopItem key={index} data={item} />)}
			</div>
		</>
	)
}

export default ShopSection
