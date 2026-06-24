import Link from 'next/link'
import Image from 'next/image'
import type { ShopEntry } from '@/types/fnapi'
import { fixImageWidth } from '@/utils'
import { entryCosmeticId, entryCosmeticName, entryImage } from '@/utils/cosmetic'

interface MiniItemProps {
	entry: ShopEntry
}

export function MiniItem({ entry }: MiniItemProps) {
	const itemId = entryCosmeticId(entry)
	const name = entryCosmeticName(entry)
	const itemImg = fixImageWidth(entryImage(entry), 400)

	return (
		<div className=':uno: relative overflow-hidden rounded-lg hover:scale-105 transition'>
			<Link href={`/locker/${itemId}`}>
				<div className=':uno: relative w-full h-44 sm:h-48 md:h-52 lg:h-36'>
					{itemImg ? (
						<Image
							src={itemImg}
							alt={name}
							fill
							className=':uno: object-cover'
							sizes='200px'
						/>
					) : null}
				</div>
				<div className=':uno: absolute text-xs sm:text-sm bottom-0 w-full bg-gray-600'>
					<h1 className=':uno: text-center text-gray-100'>{name}</h1>
					<p className=':uno: text-gray-400 flex justify-center items-center'>
						{entry.finalPrice}
						<Image
							src='/images/v-bucks.webp'
							width={20}
							height={20}
							className=':uno: h-5 w-auto'
							alt='v-bucks icon'
						/>
					</p>
				</div>
			</Link>
		</div>
	)
}
