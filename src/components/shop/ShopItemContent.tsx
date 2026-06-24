import Link from 'next/link'
import Image from 'next/image'
import { LikeButton } from '@/components/like/LikeButton'
import type { ItemShop } from '@/interfaces'
import { fixImageWidth } from '@/utils'

interface ShopItemContentProps {
	data: ItemShop
	likeLabel: string
	unlikeLabel: string
}

export function ShopItemContent({
	data,
	likeLabel,
	unlikeLabel
}: ShopItemContentProps) {
	const itemId = data.mainId || data.id
	const name = data.displayName || data.name
	const itemPrice = data.price?.finalPrice || +JSON.stringify(data.price) || 0
	const itemImg = fixImageWidth(
		data.images ? data.images.background : data?.displayAssets?.[0]?.background,
		400
	)

	return (
		<div>
			<div className=':uno: relative overflow-hidden rounded-lg hover:scale-[1.02] transition'>
				<Link href={`/locker/${itemId}`}>
					<div className=':uno: relative w-full h-44 sm:h-56'>
						<Image
							src={itemImg}
							alt={name}
							fill
							className=':uno: mx-auto hover:scale-[1.1] block transition-all object-cover'
							sizes='(max-width: 640px) 50vw, 200px'
						/>
					</div>
				</Link>
				<LikeButton
					itemId={itemId}
					itemName={name}
					likeLabel={likeLabel}
					unlikeLabel={unlikeLabel}
					className=':uno: absolute top-0 right-0 text-4xl p-2'
				/>
				<div className=':uno: absolute text-xs sm:text-sm bottom-0 w-full p-1.5 bg-gray-600'>
					<h1 className=':uno: text-center text-gray-100 px-1 pb-1'>{name}</h1>
					<p className=':uno: text-gray-400 flex justify-center items-center'>
						<span className=':uno: mr-1'>{itemPrice}</span>
						<Image
							src='/images/v-bucks.webp'
							width={20}
							height={20}
							className=':uno: h-5 w-auto'
							alt='v-bucks icon'
						/>
					</p>
				</div>
			</div>
		</div>
	)
}
