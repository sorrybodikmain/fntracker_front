import { FC } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import i18next from 'i18next'
import { fetcher } from '@/libs/apiFetcher'
import AboutItemCard from '@/components/locker/AboutItemCard'
import ItemDataTable from '@/components/locker/ItemDataTable'
import SkeletonCard from '@/components/stats/SkeletonCard'
import { ShopItemResponse } from '@/types/shop.type'
import AppHelmet from '@/components/AppHelmet'
import LockerGallery from '@/components/locker/gallery/LockerGallery'

const LockerItemPage: FC = () => {
	const { id } = useParams()
	const { data } = useSWR<ShopItemResponse>(
		`https://fortniteapi.io/v2/items/get?id=${id}&lang=${i18next.language}`,
		fetcher
	)
	scroll(0, 0)

	return (
		<>
			<AppHelmet
				title={data?.item?.name || 'Locker'}
				desc={data?.item.description}
				img={data?.item?.images.background}
			/>
			<div>
				<div className='container text-white mx-auto p-3 min-h-screen'>
					{data ?
						<>
							<AboutItemCard data={data!} />
							{data.item.displayAssets.length > 1 &&
								<LockerGallery data={data.item.displayAssets} />}
							{data?.item.shopHistory &&
								<ItemDataTable data={data} />}
						</>
						:
						<>
							<SkeletonCard />
							<SkeletonCard />
							<SkeletonCard />
						</>
					}
				</div>
			</div>
		</>
	)
}

export default LockerItemPage
