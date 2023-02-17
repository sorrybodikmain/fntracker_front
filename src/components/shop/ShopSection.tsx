import { FC, PropsWithChildren} from 'react'
import ShopItem from './ShopItem'
import { ShopTodayResponse } from '@/types/shop.type'

interface IShopSectionProps {
	data: ShopTodayResponse;
	sectionId: string
}
const ShopSection: FC<
	PropsWithChildren<IShopSectionProps>
> = ({ data, sectionId }) => {
	return (
		<>
			<h2 className='border-l-4 border-primary text-lg pl-2 my-4'>{data?.shop
				.find(item => item.section.id === sectionId)?.section.name}</h2>
			<div className='grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-5 xl:rid-cols-6 lg:gap-6'>
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
