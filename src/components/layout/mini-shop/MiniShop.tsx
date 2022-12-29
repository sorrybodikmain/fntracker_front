import { FC } from 'react'
import MiniProduct from '@/components/layout/mini-shop/MiniProduct'
import {Link} from 'react-router-dom'
import useSWR from 'swr'
import { fetcher } from '@/lib/apiFetcher'
import { ShopToday } from '@/api/types/shop.type'

const MiniShop: FC = () => {
	const { data } = useSWR<ShopToday>(
		`https://fortniteapi.io/v2/shop?lang=en`,
		fetcher
	)
	return (
		<section id='mini-shop'>
			<div className='p-6 text-white w-full lg:w-96'>
				<h2 className='border-l-4 border-primary pl-2'>FEATURED TODAY</h2>
				<div className='mt-4 grid-cols-2 grid-rows-3 gap-3 sm:gap-5 grid lg:grid-cols-2 lg:grid-rows-3 md:grid-rows-2 sm:grid-rows-2 sm:grid-cols-3'>
					{data?.shop
						.filter(item => item.section.id === 'Daily')
						.map((item, index) => (
							<MiniProduct key={index} data={item} />
						))}
				</div>
				<div className='text-center mt-4 rounded-lg p-1 bg-gray-600 hover:scale-[1.03]'>
					<Link to={'shop/'} className='text-md w-full'>
						View full shop
					</Link>
				</div>
			</div>
		</section>
	)
}

export default MiniShop
