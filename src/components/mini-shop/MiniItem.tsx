import { FC, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { ItemShop } from '@/interfaces/shop.interface.ts'
import { fixImageWidth } from '@/utils/api.utils'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { logEvent } from '@/utils/gtag.utils'

const MiniItem: FC<PropsWithChildren<{ data: ItemShop }>> = ({ data }) => {
	return (
		<div
			className=':uno: relative overflow-hidden rounded-lg hover:scale-105 transition'
			onClick={() => logEvent('Shop', 'Click', 'Mini-Shop', +data.mainId)}
		>
			<Link to={'locker/' + data.mainId}>
				<div className=':uno: relative w-full h-44 sm:h-48 md:h-52 lg:h-36 object-cover'>
					<LazyLoadImage
						src={fixImageWidth(data.displayAssets[0].background, 400)}
						alt={data.mainId}
					/>
				</div>

				<div className=':uno: absolute text-xs sm:text-sm bottom-0 w-full bg-gray-600'>
					<h1 className=':uno: text-center text-gray-100'>{data.displayName}</h1>
					<p className=':uno:  text-gray-400 flex justify-center'>
						{data.price.finalPrice}
						<LazyLoadImage
							src='/images/v-bucks.webp'
							className=':uno: h-5'
							alt='v-bucks icon'
						/>
					</p>
				</div>
			</Link>
		</div>
	)
}

export default MiniItem
