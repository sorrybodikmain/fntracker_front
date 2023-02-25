import { FC, PropsWithChildren, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/useAuth'
import { useItemSubscribeMutation, useItemUnsubscribeMutation } from '@/store/api/subscribe.api'
import { subscribeItem, unSubscribeItem } from '@/store/auth/auth.slice'
import { useAppDispatch } from '@/hooks/useTypedSelector'
import { fixImageWidth } from '@/utils/api.utils'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { ItemShop } from '@/types/shop.type'

const ShopItem: FC<PropsWithChildren<{ data: ItemShop }>> = ({ data }) => {
	const { t } = useTranslation('shop')
	const { user, accessToken } = useAuth()
	const itemId = data.mainId || data.id
	const name = data.displayName || data.name
	const itemImg = fixImageWidth((data.displayAssets ? data.displayAssets[0].background :
		data.images.background), 400)
	const hasLiked = user?.subscriptions?.some(p => p.shopItemId === itemId)
	const [like, setLike] = useState<boolean>(hasLiked || false)
	const [imgLoaded, setImgLoaded] = useState<boolean>(false)
	const onLoad = () => setTimeout(() => setImgLoaded(true), 100)

	const navigate = useNavigate()
	const [subscribe] = useItemSubscribeMutation()
	const [unSubscribe] = useItemUnsubscribeMutation()
	const dispatch = useAppDispatch()
	const handleLike = async () => {
		if (accessToken) {
			if (user?.isVerified) {
				if (like) {
					await unSubscribe(itemId).then(() => {
						dispatch(unSubscribeItem(itemId))
						setLike(false)
						toast.error(t('unlike_item', { name }))
					})
				} else {
					await subscribe(itemId)
						.then(() => {
							dispatch(subscribeItem(itemId))
							setLike(true)
							toast.success(t('like_item', { name }))
						})
				}
			} else
				toast.error(t('err_activate'))
		} else {
			toast.error(t('not_logged'))
			setTimeout(() => {
				navigate('/user/login')
			}, 1000)
		}
	}



	return (
		<div>
			<div className='relative overflow-hidden rounded-lg hover:scale-[1.02] transition'>
				<Link to={'/locker/' + itemId}>
					<div className='relative w-full h-44 sm:h-56 md:h-66 object-center'
					>
						<LazyLoadImage
							src={itemImg}
							alt={itemId}
							className={`mx-auto hover:scale-[1.1] block transition-all ${!imgLoaded && 'animate-pulse blur-sm'}`}
							onLoad={onLoad}
							loading='lazy'
							decoding='async'
						/>
					</div>
				</Link>
				<div className={`absolute top-0 right-0 text-4xl p-2 ${like ? 'text-red-500' : ''}`}
						 onClick={handleLike}>
					{like ? <AiFillHeart /> : <AiOutlineHeart />}
				</div>
				<div className='absolute text-xs sm:text-sm bottom-0 w-full bg-gray-600'>
					<h1 className='text-center text-gray-100 px-1'>{name}</h1>
					<p className=' text-gray-400 flex justify-center'>{data.price?.finalPrice || JSON.stringify(data.price) || 0}
						<LazyLoadImage
							src='/images/v-bucks.webp'
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
