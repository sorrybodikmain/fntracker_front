import { getLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { pageTitle } from '@/config/site'
import { AllItemsSection } from '@/components/shop/AllItemsSection'
import { getCosmeticsList } from '@/lib/api/fortnite'
import { dedupeCosmeticsById } from '@/utils/cosmetic'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('shop')
	return {
		title: pageTitle(t('All Items')),
		description: t('banner_title')
	}
}

export default async function AllItemsPage() {
	const locale = await getLocale()
	const cosmetics = dedupeCosmeticsById(await getCosmeticsList(locale))

	return <AllItemsSection cosmetics={cosmetics} />
}
