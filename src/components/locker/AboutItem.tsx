import { FC } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { ShopItemDetail } from '@/api/types/shop.type'
import { fetcher } from '@/libs/apiFetcher'
import ItemDataTable from './ItemDataTable'
import AboutItemCard from './AboutItemCard'
import i18next from 'i18next'

const AboutItem: FC = () => {
	const { id } = useParams()
	const { data } = useSWR<ShopItemDetail>(
		`https://fortniteapi.io/v2/items/get?id=${id}&lang=${i18next.language}`,
		fetcher
	)

	return (
		<div className='container text-white mx-auto p-3'>

			{data?.result ?
				<>
					<AboutItemCard data={data} />
					{data?.item.shopHistory ?
						<>
							<ItemDataTable data={data} />
						</>: null}
				</> :
				<h2 className='text-center text-primary text-3xl py-96'>
					Product not found
				</h2>

			}

		</div>
	)
}

export default AboutItem
