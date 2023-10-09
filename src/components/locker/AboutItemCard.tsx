import { FC, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { ShopItemResponse } from '@/interfaces'
import { useTypedSelector } from '@/hooks'
import { fixImageWidth, logEvent } from '@/utils'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Zoom from 'react-medium-image-zoom'
import styles from '@/styles/Zoom.module.css'

interface IAboutItemCardProps {
	data: ShopItemResponse
}

const AboutItemCard: FC<IAboutItemCardProps> = ({
																									data
																								}) => {
	const { t } = useTranslation('locker')
	const { items } = useTypedSelector(state => state.likes)
	const [like, setLike] = useState<boolean>(
		items.some(p => p === data.item.id)
	)

	const [imgLoaded, setImgLoaded] = useState<boolean>(false)
	const onLoad = () => setTimeout(() => setImgLoaded(true), 100)
	const handleLike = async () => {
		logEvent(
			'Shop',
			like ? 'Liked' : 'Unliked',
			`${data.item.name}(${data.item.id})`
		)

		if (like) {

			setLike(false)
			toast.error(t('unlike_item', { name: data.item.name }))

		} else {
			setLike(true)
			toast.success(t('like_item', { name: data.item.name }))

		}
	}

	return (
		<>
			<h1 className=':uno: border-l-4 border-primary pl-2 mb-4'>
				{t('card_title').toUpperCase()}
			</h1>
			<div className=':uno: flex flex-wrap bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition'>
				<div className=':uno: w-full md:w-3/12 mb-3 md:mb-0 mx-auto'>
					<div className=':uno: relative bg-cover shadow-lg'>
						<Zoom classDialog={styles.zoom}>
							<LazyLoadImage
								src={fixImageWidth(data?.item.images.background, 500)}
								alt={data.item.id}
								className={`object-cover w-full rounded-lg ${
									!imgLoaded &&
									'animate-pulse blur-sm bg-gray-600 transition-all'
								}`}
								onLoad={onLoad}
								loading='eager'
								decoding='async'
							/>
						</Zoom>
					</div>
				</div>

				<div className=':uno: relative w-full md:w-9/12 xl:w-7/12 px-3 mb-4 md:mb-0 mr-auto text-gray-500'>
					<h5 className=':uno: text-2xl mb-1 text-white flex'>
						{data?.item.name}
						<div className=':uno: ml-auto' onClick={handleLike}>
							{like ? <AiFillHeart /> : <AiOutlineHeart />}
						</div>
					</h5>
					<p className=':uno: text-md'>
						{data?.item.rarity.name} | {data?.item.type.name}
					</p>
					<p className=':uno: text-md'>{data?.item.description}</p>
					<p className=':uno: text-sm'>
						{Math.floor(100 * data!.item.interest) + ' ' + t('card_interested')}
					</p>
					<div className=':uno: items-end bottom-0 relative lg:absolute mt-2'>
						{data?.item.battlepass ? (
							<h4 className=':uno: text-white'>
								{' '}
								{t('card_bp') +
									data.item.battlepass.displayText.chapterSeason.toLowerCase()}
								.
							</h4>
						) : (
							<>
								<p>
									{t('card_appeared') +
										' ' +
										new Date(data?.item.releaseDate).toLocaleDateString()}
								</p>
								<h4 className=':uno: text-white text-lg'>
									{t('card_sold') + ' ' + data?.item.price} V-bucks.
								</h4>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default AboutItemCard
