import Link from 'next/link'
import Image from 'next/image'
import type { ItemShop } from '@/interfaces'
import { fixImageWidth } from '@/utils'

interface MiniItemProps {
	data: ItemShop
}

export function MiniItem({ data }: MiniItemProps) {
	const itemId = data.mainId || data.id
	const background =
		data.displayAssets?.[0]?.background ??
		(data.images ? data.images.background : '')

	return (
		<div className=':uno: relative overflow-hidden rounded-lg hover:scale-105 transition'>
			<Link href={`/locker/${itemId}`}>
				<div className=':uno: relative w-full h-44 sm:h-48 md:h-52 lg:h-36'>
					<Image
						src={fixImageWidth(background, 400)}
						alt={data.displayName || data.name}
						fill
						className=':uno: object-cover'
						sizes='(max-width: 1024px) 33vw, 200px'
					/>
				</div>

				<div className=':uno: absolute text-xs sm:text-sm bottom-0 w-full bg-gray-600'>
					<h1 className=':uno: text-center text-gray-100'>{data.displayName}</h1>
					<p className=':uno: text-gray-400 flex justify-center items-center'>
						{data.price.finalPrice}
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
