import { FC } from 'react'
import ShopBanner from '@/components/shop/ShopBanner'
import ShopSection from '@/components/shop/ShopSection'
import useSWR from 'swr'
import i18next from 'i18next'
import { fetcher } from '@/libs/apiFetcher'
import { ShopTodayResponse } from '@/types/shop.type'
import { useTranslation } from 'react-i18next'
import AppHelmet from '@/components/AppHelmet'

const ShopPage: FC = () => {
	const { t } = useTranslation('shop')
	const { data, isLoading } = useSWR<ShopTodayResponse>(
		`https://fortniteapi.io/v2/shop?lang=${i18next.language}`,
		fetcher
	)
	if (isLoading)
		return <div>
			<ShopBanner />
			<div className='flex justify-center items-center p-3 min-h-screen'>
				<span className="h-10 w-10 animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-90"></span>
			</div>
		</div>

	const sections = Object.keys(data?.currentRotation)

	return (
		<>
			<AppHelmet title={t('title')} desc={t('banner_title')!} />
			<div>
				<ShopBanner />
				<div className='container mx-auto text-white p-3 min-h-[81.1vh]'>
					{sections?.map(item => (
						<ShopSection key={item} data={data!} sectionId={item} />
					))}
				</div>
			</div>
		</>
	)
}

export default ShopPage
