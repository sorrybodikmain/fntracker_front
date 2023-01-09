import { FC, PropsWithChildren, useContext, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { ShopItemResponse } from '@/api/types/shop.type'
import { useTranslation } from 'react-i18next'
import { Context } from '../../index'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router'

const AboutItemCard: FC<PropsWithChildren<{ data: ShopItemResponse }>> = ({ data }) => {
	const { t } = useTranslation('locker')
	const location = useLocation()
	const { store } = useContext(Context)
	const [like, setLike] = useState<boolean>(
		store.user.subscriptions?.some(i => i.shopItemId === data.item.id)
		|| false
	)
	console.log(data)
	const navigate = useNavigate()
	const handleLike = () => {
		if (store.isAuth) {
			if (like) {
				store.unsubscribe(data.item.id).then(() => {
					setLike(false)
					toast.success('Successfully removed from likes!')
				})
			} else {
				store.subscribe(data.item.id).then(() => {
					setLike(true)
					toast.success('Liked successfully!')
				})
			}
		} else {
			toast.error('You are not logged in!')
			setTimeout(() => {
				navigate(`/user/login?redirectTo=${location.pathname}`)
			}, 4000)
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
