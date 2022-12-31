import {FC, useEffect, useState} from 'react'
import useSWR from 'swr'
import {fetcher} from '@/libs/apiFetcher';
import ShopSection from "./ShopSection";
import { ShopToday } from '@/api/types/shop.type'
import i18next from 'i18next'

const ShopList: FC = () => {
	const [sections, setSections] = useState<string[]>()
	const { data } = useSWR<ShopToday>(
		`https://fortniteapi.io/v2/shop?lang=${i18next.language}`,
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
					<ShopSection key={item} data={data!} sectionId={item} />
				))}
			</div>
		</div>
	)
}

export default ShopList
