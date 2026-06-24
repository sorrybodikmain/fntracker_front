import { getLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ShopBanner } from '@/components/shop/ShopBanner'
import { ShopSection } from '@/components/shop/ShopSection'
import { getShop } from '@/lib/api/fortnite'
import type { ShopTodayResponse } from '@/interfaces'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('shop')
	return {
		title: `${t('title')} | FNTracker`,
		description: t('banner_title')
	}
}

export default async function ShopPage() {
	const locale = await getLocale()
	const data = (await getShop(locale)) as ShopTodayResponse
	const sections = Object.keys(data.currentRotation)

	return (
		<div>
			<ShopBanner />
			<div className=':uno: container mx-auto text-white p-3 min-h-screen'>
				{sections.map(item => (
					<ShopSection key={item} items={data.shop} sectionId={item} />
				))}
			</div>
		</div>
	)
}
