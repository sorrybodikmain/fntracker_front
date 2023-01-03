import { FC, PropsWithChildren, useState } from 'react'
import { Link } from 'react-router-dom'
import { ItemShop } from '@/api/types/shop.type'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

const ShopItem: FC<PropsWithChildren<{ data: ItemShop }>> = ({ data }) => {
	const [like, setLike] = useState<boolean>(true)
	const handleLike = () => {
		// const message = like ? 'Liked successfully!' : 'Successfully removed from likes!'
		setLike(!like)
	}
	return (
		<div>
			<div className='relative overflow-hidden rounded-lg hover:scale-[0.98] transition'>
				<Link to={'/locker/' + data.mainId}>
					<div className='relative w-96 h-96 object-center'>
						<img
							src={data.displayAssets[0].background || '/images/preloader.gif'}
							alt={data.mainId}
							className='mx-auto block'
						/>
					</div>
				</Link>
				<div className='absolute top-0 right-0 text-4xl p-2' onClick={handleLike}>
					{like ? <AiFillHeart /> : <AiOutlineHeart />}
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
		</div>
	)
}

export default ShopItem
