import { FC, PropsWithChildren, useContext } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { Subscription } from '@/api/types/subscription.type'
import { ShopItemResponse } from '@/api/types/shop.type'
import { fetcher } from '@/libs/apiFetcher'
import { Context } from '../../../index'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import i18next from 'i18next'
import useSWR from 'swr'
import { useTranslation } from 'react-i18next'

const FavoriteItem: FC<PropsWithChildren<{
	subscription: Subscription,
	deleteItem: any
}>> = ({
				 subscription,
				 deleteItem
			 }) => {
	const { t } = useTranslation('user-profile')
	const { store } = useContext(Context)
	const handleLike = () => {
		store.unsubscribe(subscription.shopItemId).then(() => {
			deleteItem(subscription.shopItemId)
			toast.success(t('unlike_item'))
		})

	}


	const { data } = useSWR<ShopItemResponse>(
		`https://fortniteapi.io/v2/items/get?id=${subscription.shopItemId}&lang=${i18next.language}`,
		fetcher)
	return (
		<>
			<div className='relative overflow-hidden rounded-lg hover:scale-105 transition'>

				<div className='relative w-full h-44 sm:h-48 md:h-56 object-cover'>
					<Link to={'/locker/' + data?.item.id}>
						<img
							src={data?.item.images.background || '/images/preloader.gif'}
							alt={data?.item.id}
						/>
					</Link>
				</div>

				<div className='absolute top-0 right-0 text-4xl p-1 text-red-500' onClick={handleLike}>
					<AiFillHeart />
				</div>

				<div className='absolute text-xs sm:text-sm bottom-0 w-full bg-gray-600'>
					<h1 className='text-center text-gray-100'>{data?.item.name}</h1>
					<p className=' text-gray-400 flex justify-center'>
						{data?.item.price}
						<img
							src={'/images/v-bucks.webp'}
							className='h-5'
							alt='v-bucks icon'
						/>
					</p>
				</div>

			</div>
		</>

	)
}

export default FavoriteItem
