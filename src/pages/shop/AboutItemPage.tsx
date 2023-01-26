import { FC } from 'react'
import Layout from '@/components/Layout'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import i18next from 'i18next'
import { fetcher } from '@/libs/apiFetcher'
import AboutItemCard from '@/components/locker/AboutItemCard'
import ItemDataTable from '@/components/locker/ItemDataTable'
import SkeletonCard from '@/components/stats/SkeletonCard'
import { ShopItemResponse } from '@/types/shop.type'

const AboutItemPage: FC = () => {
	const { id } = useParams()
	const { data } = useSWR<ShopItemResponse>(
		`https://fortniteapi.io/v2/items/get?id=${id}&lang=${i18next.language}`,
		fetcher
	)
	scroll(0, 0)

	return (
		<Layout>
			<div className='container text-white mx-auto p-3 min-h-[81.1vh]'>
				{data ?
					<>
						<AboutItemCard data={data!} />
						{data?.item.shopHistory ?
							<ItemDataTable data={data} />
							: null}
					</>
					:
					<>
						<SkeletonCard />
						<SkeletonCard />
						<SkeletonCard />
					</>
				}
			</div>
		</Layout>

	)
}

export default AboutItemPage
