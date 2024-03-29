import { FC } from 'react'
import ShopBanner from '@/components/shop/ShopBanner'
import ShopSection from '@/components/shop/ShopSection'
import useSWR from 'swr'
import i18next from 'i18next'
import { fetcher } from '@/libs/apiFetcher'
import { ShopTodayResponse } from '@/interfaces/shop.interface.ts'
import { useTranslation } from 'react-i18next'
import AppHelmet from '@/components/AppHelmet'
import Preloader from '@/components/preloaders/Preloader'

const ShopPage: FC = () => {
	const { t } = useTranslation('shop')
	const { data, isLoading } = useSWR<ShopTodayResponse>(
		`https://fortniteapi.io/v2/shop?lang=${i18next.language}`,
		fetcher
	)
	if (isLoading)
		return (
			<div>
				<ShopBanner />
				<Preloader />
			</div>
		)

	const sections = Object.keys(data?.currentRotation)

	return (
		<>
			<AppHelmet title={t('title')} desc={t('banner_title')!} />
			<div>
				<ShopBanner />
				<div className=':uno: container mx-auto text-white p-3 min-h-screen'>
					{sections?.map(item => (
						<ShopSection key={item} items={data!.shop} sectionId={item} />
					))}
				</div>
			</div>
		</>
	)
}

export default ShopPage
