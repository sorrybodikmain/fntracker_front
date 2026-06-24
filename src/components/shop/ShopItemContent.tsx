import Link from 'next/link'
import Image from 'next/image'
import { LikeButton } from '@/components/like/LikeButton'
import type { ShopEntry } from '@/types/fnapi'
import { fixImageWidth } from '@/utils'
import { entryCosmeticId, entryCosmeticName, entryImage } from '@/utils/cosmetic'

interface ShopItemContentProps {
	entry: ShopEntry
	likeLabel: string
	unlikeLabel: string
}

export function ShopItemContent({
	entry,
	likeLabel,
	unlikeLabel
}: ShopItemContentProps) {
	const itemId = entryCosmeticId(entry)
	const name = entryCosmeticName(entry)
	const itemImg = fixImageWidth(entryImage(entry), 400)

	return (
		<div>
			<div className=':uno: relative overflow-hidden rounded-lg hover:scale-[1.02] transition'>
				<Link href={`/locker/${itemId}`}>
					<div className=':uno: relative w-full h-44 sm:h-56'>
						{itemImg ? (
							<Image
								src={itemImg}
								alt={name}
								fill
								className=':uno: mx-auto hover:scale-[1.1] block transition-all object-cover'
								sizes='(max-width: 640px) 50vw, 200px'
							/>
						) : null}
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
						<span className=':uno: mr-1'>{entry.finalPrice}</span>
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
