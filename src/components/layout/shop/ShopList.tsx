import {FC, useEffect, useState} from 'react'
import { ShopToday } from '@/api/types/shop.type'
import { fetcher } from '@/lib/apiFetcher'
import ShopSection from '@/components/layout/shop/ShopSection'
import useSWR from 'swr'

const ShopList: FC = () => {
	const [sections, setSections] = useState<string[]>()
	const { data } = useSWR<ShopToday>(
		`https://fortniteapi.io/v2/shop?lang=en`,
		fetcher
	)
	useEffect(() => {
		if (data)
		setSections(Object.keys(data.currentRotation))
	}, [data])


	return (
		<div>
			<div className='container mx-auto text-white p-3'>
				{sections?.map(item => (
					<ShopSection data={data!} sectionId={item} />
				))}
			</div>
		</div>
	)
}

export default ShopList
