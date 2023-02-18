import { FC } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import i18next from 'i18next'
import { fetcher } from '@/libs/apiFetcher'
import AboutItemCard from '@/components/locker/AboutItemCard'
import ItemDataTable from '@/components/locker/ItemDataTable'
import { ShopItemResponse } from '@/types/shop.type'
import AppHelmet from '@/components/AppHelmet'
import LockerGallery from '@/components/locker/gallery/LockerGallery'
import { Navigate } from 'react-router'
import SkeletonCard from '@/components/stats/SkeletonCard'

const ItemPage: FC = () => {
	const { id } = useParams()
	const { data, isLoading } = useSWR<ShopItemResponse>(
		`https://fortniteapi.io/v2/items/get?id=${id}&lang=${i18next.language}`,
		fetcher
	)
	scroll(0, 0)
	if (isLoading)
		return <>
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
		</>

	return (
		<>
			<AppHelmet
				title={data?.item?.name || 'Locker'}
				desc={data?.item?.description}
				img={data?.item?.images?.background}
			/>
			<div>
				<div className='container text-white mx-auto p-3 min-h-screen'>
					<>
						{data?.result ? <>
								<AboutItemCard data={data!} />
								{data!.item.displayAssets.length > 1 &&
									<LockerGallery data={data!.item.displayAssets} />}
								{data?.item.shopHistory && <ItemDataTable data={data} />}
							</>
							:
							<Navigate to='/404' />
						}
					</>
				</div>
			</div>
		</>
	)
}

export default ItemPage
