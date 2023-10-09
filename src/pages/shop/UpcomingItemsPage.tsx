import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import { IUpcomingItemsResponse } from '@/interfaces/shop.interface.ts'
import i18next from 'i18next'
import { fetcher } from '@/libs/apiFetcher'
import Preloader from '@/components/preloaders/Preloader'
import AppHelmet from '@/components/AppHelmet'
import ShopSection from '@/components/shop/ShopSection'

const UpcomingItemsPage: FC = () => {
	const { t } = useTranslation('shop')
	const { data, isLoading } = useSWR<IUpcomingItemsResponse>(
		`https://fortniteapi.io/v2/items/upcoming?lang=${i18next.language}`,
		fetcher
	)

	if (isLoading)
		return (
			<div>
				<Preloader />
			</div>
		)

	return (
		<>
			<AppHelmet title={t('upcoming_title')} desc={t('upcoming_title')!} />
			<div>
				<div className=':uno: container mx-auto text-white p-3 min-h-screen'>
					<ShopSection items={data!.items} sectionName={t('upcoming_title')!} />
				</div>
			</div>
		</>
	)
}

export default UpcomingItemsPage
