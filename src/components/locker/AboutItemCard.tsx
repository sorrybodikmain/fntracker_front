import { getTranslations } from 'next-intl/server'
import type { BRCosmetic } from '@/types/fnapi'
import { LikeButton } from '@/components/like/LikeButton'
import { ZoomableImage } from '@/components/shared/ZoomableImage'
import { fixImageWidth } from '@/utils'
import { cosmeticDisplayImage } from '@/utils/cosmetic'

interface AboutItemCardProps {
	cosmetic: BRCosmetic
}

export async function AboutItemCard({ cosmetic }: AboutItemCardProps) {
	const t = await getTranslations('locker')

	return (
		<>
			<h1 className=':uno: border-l-4 border-primary pl-2 mb-4'>
				{t('card_title').toUpperCase()}
			</h1>
			<div className=':uno: flex flex-wrap bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition'>
				<div className=':uno: w-full md:w-3/12 mb-3 md:mb-0 mx-auto'>
					<div className=':uno: relative bg-cover shadow-lg'>
						<ZoomableImage
							src={fixImageWidth(cosmeticDisplayImage(cosmetic), 500)}
							alt={cosmetic.id}
							width={500}
							height={500}
							className=':uno: object-cover w-full rounded-lg'
							priority
						/>
					</div>
				</div>
				<div className=':uno: relative w-full md:w-9/12 xl:w-7/12 px-3 mb-4 md:mb-0 mr-auto text-gray-500'>
					<h5 className=':uno: text-2xl mb-1 text-white flex'>
						{cosmetic.name}
						<LikeButton
							itemId={cosmetic.id}
							itemName={cosmetic.name}
							likeLabel={t('like_item', { name: cosmetic.name })}
							unlikeLabel={t('unlike_item', { name: cosmetic.name })}
							className=':uno: ml-auto'
						/>
					</h5>
					<p className=':uno: text-md'>
						{cosmetic.rarity.displayValue} | {cosmetic.type.displayValue}
					</p>
					<p className=':uno: text-md'>{cosmetic.description}</p>
					<div className=':uno: items-end bottom-0 relative lg:absolute mt-2'>
						{cosmetic.introduction?.text ? (
							<h4 className=':uno: text-white'>{cosmetic.introduction.text}</h4>
						) : null}
						<p>
							{t('card_appeared')}{' '}
							{new Date(cosmetic.added).toLocaleDateString()}
						</p>
					</div>
				</div>
			</div>
		</>
	)
}
