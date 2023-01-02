import { FC, PropsWithChildren } from 'react'
import ShopItem from './ShopItem'
import { ShopToday } from '@/api/types/shop.type'

const ShopSection: FC<
	PropsWithChildren<{ data: ShopToday; sectionId: string }>
> = ({ data, sectionId }) => {
	return (
		<>
			<h2 className='border-l-4 border-primary text-lg pl-2 mb-4'>{data?.shop
				.find(item => item.section.id === sectionId)?.section.name}</h2>
			<div className='flex gap-x-4 overflow-x-auto mb-4'>
				{data?.shop
					.filter(item => item.section.id === sectionId)
					.map((item, index) => (
						<ShopItem key={index} data={item} />
					))}
			</div>
		</>
	)
}

export default ShopSection
