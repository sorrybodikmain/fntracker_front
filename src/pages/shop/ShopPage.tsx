import { FC } from 'react'
import Layout from '@/components/Layout'
import ShopBanner from '@/components/shop/ShopBanner'
import ShopSection from '@/components/shop/ShopSection'
import useSWR from 'swr'
import i18next from 'i18next'
import { fetcher } from '@/libs/apiFetcher'
import { ShopTodayResponse } from '@/types/shop.type'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const ShopPage: FC = () => {
	const { t } = useTranslation('shop')
	const { data, isLoading } = useSWR<ShopTodayResponse>(
		`https://fortniteapi.io/v2/shop?lang=${i18next.language}`,
		fetcher
	)
	if (isLoading)
		return <Layout>
			<ShopBanner />
			<div className='flex justify-center items-center p-3 min-h-[64vh]'>
				<span className="h-10 w-10 animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-90"></span>
			</div>
		</Layout>

	const sections = Object.keys(data?.currentRotation)

	return (
		<>
			<Helmet>
				<title>{t('title')} | FNTracker</title>
				<meta name='description' content={t('banner_title')!} />
			</Helmet>
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
