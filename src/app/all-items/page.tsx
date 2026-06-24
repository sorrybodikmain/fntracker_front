import { getLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { AllItemsSection } from '@/components/shop/AllItemsSection'
import { getItemsList } from '@/lib/api/fortnite'
import type { AllItemsResponse } from '@/interfaces'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('shop')
	return {
		title: `${t('All Items')} | FNTracker`,
		description: t('banner_title')
	}
}

export default async function AllItemsPage() {
	const locale = await getLocale()
	const data = (await getItemsList(locale)) as AllItemsResponse

	return <AllItemsSection items={data.items} />
}
