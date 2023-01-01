import { FC } from 'react'
import {Link} from 'react-router-dom'
import useSWR from 'swr'
import MiniItem from "./MiniItem";
import { ShopToday } from '@/api/types/shop.type'
import { fetcher } from '@/libs/apiFetcher'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

const MiniShop: FC = () => {
	const {t} = useTranslation('home')
	const { data } = useSWR<ShopToday>(
		`https://fortniteapi.io/v2/shop?lang=${i18next.language}`,
		fetcher
	)
	return (
		<section id='mini-shop'>
			<div className='p-6 text-white w-full lg:w-96'>
				<h2 className='border-l-4 border-primary pl-2'>{t('shop_title').toUpperCase()}</h2>
				<div className='mt-4 grid-cols-2 grid-rows-3 gap-3 sm:gap-5 grid lg:grid-cols-2 lg:grid-rows-3 md:grid-rows-2 sm:grid-rows-2 sm:grid-cols-3'>
					{data?.shop
						.filter(item => item.section.id === 'Daily')
						.map((item, index) => (
							<MiniItem key={index} data={item} />
						))}
				</div>
				<div className='text-center mt-4 rounded-lg p-1 bg-gray-600 hover:scale-[1.03]'>
					<Link to={'shop/'} className='text-md w-full'>
						{t('shop_link')}
					</Link>
				</div>
			</div>
		</section>
	)
}

export default MiniShop
