import { FC, PropsWithChildren, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/useAuth'
import { useItemSubscribeMutation, useItemUnsubscribeMutation } from '@/store/api/subscribe.api'
import { ItemShop } from '@/types/shop.type'
import { subscribeItem, unSubscribeItem } from '@/store/auth/auth.slice'
import { useAppDispatch } from '@/hooks/useTypedSelector'
import { fixImageWidth } from '@/utils/api.utils'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ShopItem: FC<PropsWithChildren<{ data: ItemShop }>> = ({ data }) => {
	const { t } = useTranslation('shop')
	const { user, accessToken } = useAuth()
	const [like, setLike] = useState<boolean>(
		user?.subscriptions?.some(p => p.shopItemId === data.mainId)
		|| false)
	const [currentImg, setCurrentImg] = useState<string>(fixImageWidth(data?.displayAssets[0]?.background, 400))
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
					await unSubscribe(data.mainId).then(() => {
						dispatch(unSubscribeItem(data.mainId))
						setLike(false)
						toast.error(t('unlike_item', { name: data.displayName }))
					})
				} else {
					await subscribe(data.mainId)
						.then(() => {
							dispatch(subscribeItem(data.mainId))
							setLike(true)
							toast.success(t('like_item', { name: data.displayName }))
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

	const mouseEnter = () => {
		if (data.displayAssets.length > 1)
			setCurrentImg(fixImageWidth(data?.displayAssets[1]?.background, 400))
	}
	const mouseLeave = () =>
		setCurrentImg(fixImageWidth(data?.displayAssets[0]?.background, 400))

	return (
		<div>
			<div className='relative overflow-hidden rounded-lg hover:scale-[1.02] transition'>
				<Link to={'/locker/' + data.mainId}>
					<div className='relative w-full h-44 sm:h-56 md:h-66 object-center'
							 onMouseEnter={mouseEnter}
							 onMouseLeave={mouseLeave}
					>
						<LazyLoadImage
							src={currentImg}
							alt={data.mainId}
							className={`mx-auto block transition-all ${!imgLoaded && 'animate-pulse blur-sm bg-gray-600'}`}
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
					<h1 className='text-center text-gray-100'>{data.displayName}</h1>
					<p className=' text-gray-400 flex justify-center'>{data.price.finalPrice}
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
