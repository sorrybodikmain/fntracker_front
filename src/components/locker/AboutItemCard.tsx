import { getTranslations } from 'next-intl/server'
import type { ShopItemResponse } from '@/interfaces'
import { LikeButton } from '@/components/like/LikeButton'
import { ZoomableImage } from '@/components/shared/ZoomableImage'
import { fixImageWidth } from '@/utils'

interface AboutItemCardProps {
	data: ShopItemResponse
}

export async function AboutItemCard({ data }: AboutItemCardProps) {
	const t = await getTranslations('locker')
	const itemName = data.item.name

	return (
		<>
			<h1 className=':uno: border-l-4 border-primary pl-2 mb-4'>
				{t('card_title').toUpperCase()}
			</h1>
			<div className=':uno: flex flex-wrap bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition'>
				<div className=':uno: w-full md:w-3/12 mb-3 md:mb-0 mx-auto'>
					<div className=':uno: relative bg-cover shadow-lg'>
						<ZoomableImage
							src={fixImageWidth(data.item.images.background, 500)}
							alt={data.item.id}
							width={500}
							height={500}
							className=':uno: object-cover w-full rounded-lg'
							priority
						/>
					</div>
				</div>

				<div className=':uno: relative w-full md:w-9/12 xl:w-7/12 px-3 mb-4 md:mb-0 mr-auto text-gray-500'>
					<h5 className=':uno: text-2xl mb-1 text-white flex'>
						{data.item.name}
						<LikeButton
							itemId={data.item.id}
							itemName={itemName}
							likeLabel={t('like_item', { name: itemName })}
							unlikeLabel={t('unlike_item', { name: itemName })}
							className=':uno: ml-auto'
						/>
					</h5>
					<p className=':uno: text-md'>
						{data.item.rarity.name} | {data.item.type.name}
					</p>
					<p className=':uno: text-md'>{data.item.description}</p>
					<p className=':uno: text-sm'>
						{Math.floor(100 * data.item.interest) + ' ' + t('card_interested')}
					</p>
					<div className=':uno: items-end bottom-0 relative lg:absolute mt-2'>
						{data.item.battlepass ? (
							<h4 className=':uno: text-white'>
								{t('card_bp') +
									data.item.battlepass.displayText.chapterSeason.toLowerCase()}
								.
							</h4>
						) : (
							<>
								<p>
									{t('card_appeared') +
										' ' +
										new Date(data.item.releaseDate).toLocaleDateString()}
								</p>
								<h4 className=':uno: text-white text-lg'>
									{t('card_sold') + ' ' + data.item.price} V-bucks.
								</h4>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
