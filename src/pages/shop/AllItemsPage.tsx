import { FC } from 'react'
import useSWR from 'swr'
import i18next from 'i18next'
import { AllItemsResponse } from '@/interfaces/shop.interface'
import { useTranslation } from 'react-i18next'
import AppHelmet from '@/components/AppHelmet'
import Preloader from '@/components/preloaders/Preloader'
import AllItemsSection from '@/components/shop/AllItemsSection'
import { fetcher } from '@/libs/apiFetcher.ts'

const ShopPage: FC = () => {
	const { t } = useTranslation('shop')
	const { data, isLoading } = useSWR<AllItemsResponse>(
		`https://fortniteapi.io/v2/items/list?lang=${i18next.language}`,
		fetcher
	)

	if (isLoading) return <Preloader />

	return (
		<>
			<AppHelmet title={t('All Items')} desc={t('banner_title')!} />
			<AllItemsSection items={data!.items} />
		</>
	)
}

export default ShopPage
