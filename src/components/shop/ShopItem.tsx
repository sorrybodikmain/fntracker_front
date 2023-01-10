import { FC, PropsWithChildren, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ItemShop } from '@/api/types/shop.type'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { Context } from '../../index'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const ShopItem: FC<PropsWithChildren<{ data: ItemShop }>> = ({ data }) => {
	const { t } = useTranslation('shop')
	const { store } = useContext(Context)
	const [like, setLike] = useState<boolean>(
		store.user.subscriptions?.some(i => i.shopItemId === data.mainId)
		|| false
	)
	const location = useLocation()
	const navigate = useNavigate()
	const handleLike = () => {
		if (store.isAuth) {
			if (like) {
				store.unsubscribe(data.mainId).then(() => {
					setLike(false)
					toast.success(t('unlike_item'))
				})
			} else {
				store.subscribe(data.mainId).then(() => {
					setLike(true)
					toast.success(t('like_item'))
				})
			}
		} else {
			toast.error(t('not_logged'))
			setTimeout(() => {
				navigate(`/user/login?redirectTo=${location.pathname}`)
			}, 4000)
		}

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
				<div className={`absolute top-0 right-0 text-4xl p-2 ${like ? 'text-red-500' : ''}`} onClick={handleLike}>
					{like ? <AiFillHeart /> : <AiOutlineHeart />}
				</div>
				<div className='absolute text-xs sm:text-sm bottom-0 w-full bg-gray-600'>
					<h1 className='text-center text-gray-100'>{data.displayName}</h1>
					<p className=' text-gray-400 flex justify-center'>{data.price.finalPrice}
						<img
							src={'/images/v-bucks.webp'}
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
