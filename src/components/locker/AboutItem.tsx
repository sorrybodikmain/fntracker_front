import { FC } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { ShopItemDetail } from '@/api/types/shop.type'
import { fetcher } from '@/libs/apiFetcher'
import ItemDataTable from './ItemDataTable'
import AboutItemCard from './AboutItemCard'
import i18next from 'i18next'
import SkeletonPosts from '@/components/posts/SkeletonPosts'

const AboutItem: FC = () => {
	const { id } = useParams()
	const { data } = useSWR<ShopItemDetail>(
		`https://fortniteapi.io/v2/items/get?id=${id}&lang=${i18next.language}`,
		fetcher
	)
	scroll(0, 0)

	return (
		<div className='container text-white mx-auto p-3'>
			{data ?
				<>
					<AboutItemCard data={data!} />
					{data?.item.shopHistory ?
						<ItemDataTable data={data} />
						: null}
				</>
				:
				<SkeletonPosts/>
			}
		</div>
	)
}

export default AboutItem