import { FC, PropsWithChildren, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'
import { useItemSubscribeMutation, useItemUnsubscribeMutation } from '@/store/api/subscribe.api'
import { toast } from 'react-toastify'
import { useAuth } from '@/hooks/useAuth'
import { ShopItemResponse } from '@/types/shop.type'
import { useAppDispatch } from '@/hooks/useTypedSelector'
import { subscribeItem, unSubscribeItem } from '@/store/auth/auth.slice'

interface IAboutItemCardProps {
	data: ShopItemResponse
}

const AboutItemCard: FC<PropsWithChildren<IAboutItemCardProps>> = ({ data }) => {

	const { t } = useTranslation('locker')
	const { user } = useAuth()
	const [like, setLike] = useState<boolean>(
		user?.subscriptions?.some(p => p.shopItemId === data.item.id)
		|| false
	)

	const location = useLocation()
	const navigate = useNavigate()

	const [subscribe] = useItemSubscribeMutation()
	const [unSubscribe] = useItemUnsubscribeMutation()
	const dispatch = useAppDispatch()

	const handleLike = async () => {
		if (user) {
			if (user.isVerified) {
				if (like) {
					await unSubscribe(data.item.id).then(() => {
						dispatch(unSubscribeItem(data.item.id))
						setLike(false)
						toast.error(t('unlike_item'))
					})
				} else {
					await subscribe(data.item.id)
						.then(() => {
							dispatch(subscribeItem(data.item.id))
							setLike(true)
							toast.success(t('like_item'))
						})
				}
			} else
				toast.error(t('err_activate'))
		} else {
			toast.error(t('not_logged'))
			setTimeout(() => {
				navigate(`/user/login?redirectTo=${location.pathname}`)
			}, 1000)
		}
	}

	return (<div>
			<h2 className='border-l-4 border-primary pl-2 mb-4'>
				{t('card_title').toUpperCase()}
			</h2>
			<div className='flex flex-wrap bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition'>
				<div className='w-full md:w-3/12 mb-3 md:mb-0 mx-auto'>
					<div className='relative bg-cover shadow-lg'>
						<img
							src={data?.item.images.background || '/images/preloader.gif'}
							alt={'shop-item-image'}
							className='object-cover w-full rounded-lg'
						/>
					</div>
				</div>

				<div className='relative w-full md:w-9/12 xl:w-7/12 px-3 mb-4 md:mb-0 mr-auto text-gray-500'>
					<h5 className='text-2xl mb-1 text-white flex'>
						{data?.item.name}
						<div className='ml-auto' onClick={handleLike}>
							{like ? <AiFillHeart /> : <AiOutlineHeart />}
						</div>
					</h5>
					<p className='text-md'>
						{data?.item.rarity.name} | {data?.item.type.name}
					</p>
					<p className='text-md'>{data?.item.description}</p>
					<p className='text-sm'>
						{Math.floor(10000 * data!.item.interest) + t('card_interested')}
					</p>
					<div className='items-end bottom-0 relative lg:absolute mt-2'>

						{
							data?.item.battlepass ?
								<h4
									className='text-white'> {t('card_bp') +
									data.item.battlepass.displayText.chapterSeason.toLowerCase()}.
								</h4> : <>
									<p>{t('card_appeared') + ' ' +
										new Date(data?.item.releaseDate).toLocaleDateString()}
									</p>
									<h4 className='text-white text-lg'>
										{t('card_sold') + ' ' + data?.item.price} V-bucks.
									</h4>
								</>

						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AboutItemCard
