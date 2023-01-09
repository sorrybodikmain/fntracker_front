import { FC, useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import ShopBanner from '@/components/shop/ShopBanner'
import ShopSection from '@/components/shop/ShopSection'
import useSWR from 'swr'
import { ShopTodayResponse } from '@/api/types/shop.type'
import i18next from 'i18next'
import { fetcher } from '@/libs/apiFetcher'

const ShopPage: FC = () => {
	const [sections, setSections] = useState<string[]>()
	const { data } = useSWR<ShopTodayResponse>(
		`https://fortniteapi.io/v2/shop?lang=${i18next.language}`,
		fetcher
	)
	useEffect(() => {
		if (data)
			setSections(Object.keys(data.currentRotation))
	}, [data?.shop[0].displayName])

	return (
		<>
			<Layout>
				<ShopBanner />
				<div className='container mx-auto text-white p-3 min-h-[81.1vh]'>
					{sections?.map(item => (
						<ShopSection key={item} data={data!} sectionId={item} />
					))}
				</div>
			</Layout>
		</>
	)
}

export default ShopPage
