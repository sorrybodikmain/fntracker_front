import { FC, PropsWithChildren } from 'react'
import ShopItem from './ShopItem'
import { ItemShop } from '@/types/shop.type'

interface IShopSectionProps {
	items: ItemShop[];
	sectionId?: string
	sectionName?: string
}
const ShopSection: FC<
	PropsWithChildren<IShopSectionProps>
> = ({
			 items,
			 sectionId,
			 sectionName
		 }) => {
	return (
		<>
			<h1 className='border-l-4 border-primary text-md pl-2 my-4'>{
				sectionName ||
				items.find(item => item.section.id === sectionId)?.section.name
			}</h1>
			<div className='grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-6'>
				{sectionId?
					items
					.filter(item => item.section.id === sectionId)
					.map((item, index) => (
						<ShopItem key={index} data={item} />
					))
					:
					items
						.map((item, index) => (
							<ShopItem key={index} data={item} />
						))
				}
			</div>
		</>
	)
}

export default ShopSection
