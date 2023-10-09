import { FC, PropsWithChildren, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useActions, useTypedSelector } from '@/hooks'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { ItemShop } from '@/interfaces'
import { fixImageWidth, logEvent } from '@/utils'

const ShopItem: FC<PropsWithChildren<{ data: ItemShop }>> = ({ data }) => {
	const { t } = useTranslation('shop')
	const itemId = data.mainId || data.id
	const name = data.displayName || data.name
	const itemPrice = data.price?.finalPrice || +JSON.stringify(data.price) || 0
	const itemImg = fixImageWidth(
		data.images ? data.images.background : data?.displayAssets?.[0]?.background,
		400
	)
	const { items } = useTypedSelector(state => state.likes)
	const hasLiked = items?.some(p => p === itemId)
	const [like, setLike] = useState<boolean>(hasLiked || false)
	const [imgLoaded, setImgLoaded] = useState<boolean>(false)
	const onLoad = () => setTimeout(() => setImgLoaded(true), 100)
	const { addLike, deleteLike } = useActions()
	const handleLike = async () => {
		logEvent('Shop', like ? 'Liked' : 'Unliked', `${data.name}(${data.id})`)
		if (like) {
			addLike(itemId)
			setLike(false)
			toast.error(t('unlike_item', { name }))
		} else {
			deleteLike(itemId)
			setLike(true)
			toast.success(t('like_item', { name }))
		}
	}

	return (
		<div>
			<div
				className=':uno: relative overflow-hidden rounded-lg hover:scale-[1.02] transition'
				onClick={() => logEvent('Shop', 'Click', 'Shop', +data.id)}
			>
				<Link to={'/locker/' + itemId}>
					<div className=':uno: relative w-full h-44 sm:h-56 object-center'>
						<LazyLoadImage
							src={itemImg}
							alt={itemId}
							className={`mx-auto hover:scale-[1.1] block transition-all ${
								!imgLoaded && 'animate-pulse blur-sm'
							}`}
							onLoad={onLoad}
							loading='lazy'
							decoding='async'
						/>
					</div>
				</Link>
				<div
					className={`absolute top-0 right-0 text-4xl p-2 ${
						like ? 'text-red-500' : ''
					}`}
					onClick={handleLike}
				>
					{like ? <AiFillHeart /> : <AiOutlineHeart />}
				</div>
				<div className=':uno: absolute text-xs sm:text-sm bottom-0 w-full p-1.5 bg-gray-600'>
					<h1 className=':uno: text-center text-gray-100 px-1 pb-1'>{name}</h1>
					<p className=':uno: text-gray-400 flex justify-center'>
						<span className=':uno: mr-1'>{itemPrice}</span>
						<LazyLoadImage
							src='/images/v-bucks.webp'
							className=':uno: h-5'
							alt='v-bucks icon'
						/>
					</p>
				</div>
			</div>
		</div>
	)
}

export default ShopItem
