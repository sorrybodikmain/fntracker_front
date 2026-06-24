import { getLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ShopSection } from '@/components/shop/ShopSection'
import { getUpcomingItems } from '@/lib/api/fortnite'
import type { IUpcomingItemsResponse } from '@/interfaces'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('shop')
	return {
		title: `${t('upcoming_title')} | FNTracker`,
		description: t('upcoming_title')
	}
}

export default async function UpcomingItemsPage() {
	const locale = await getLocale()
	const t = await getTranslations('shop')
	const data = (await getUpcomingItems(locale)) as IUpcomingItemsResponse

	return (
		<div className=':uno: container mx-auto text-white p-3 min-h-screen'>
			<ShopSection
				items={data.items}
				sectionName={t('upcoming_title')}
			/>
		</div>
	)
}
