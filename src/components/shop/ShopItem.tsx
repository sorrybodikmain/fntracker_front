import { FC, PropsWithChildren } from 'react'
import {Link} from 'react-router-dom'
import { ItemShop } from '@/api/types/shop.type'

const ShopItem: FC<PropsWithChildren<{ data: ItemShop }>> = ({ data }) => {
	return (
		<Link to={'locker/' + data.mainId}>
			<div className='relative overflow-hidden rounded-lg hover:scale-95 transition'>
				<div className='relative w-96 h-96 object-center'>
					<img
						src={data.displayAssets[0].background || '/images/preloader.gif'}
						alt={data.mainId}
						className='mx-auto block'
					/>
				</div>
				<div className='absolute text-xs sm:text-sm bottom-0 w-full bg-gray-600'>
					<h1 className='text-center text-gray-100'>{data.displayName}</h1>
					<p className=' text-gray-400 flex justify-center'>{data.price.finalPrice}
						<img
							src={'/images/v-bucks.png'}
							className='h-5'
							alt='v-bucks icon'
						/>
					</p>
				</div>
			</div>
		</Link>
	)
}

export default ShopItem
