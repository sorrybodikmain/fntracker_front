import { getLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { CatalogTabs } from '@/components/catalog/CatalogTabs'
import { PageContainer } from '@/components/ui/PageContainer'
import { SectionHeading } from '@/components/ui/SectionHeading'
import {
	getBeanCosmetics,
	getCarCosmetics,
	getInstrumentCosmetics,
	getLegoCosmetics,
	getTrackCosmetics
} from '@/lib/api/fortnite'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('catalog')
	return { title: `${t('title')} | FNTracker` }
}

export default async function CatalogPage() {
	const locale = await getLocale()
	const t = await getTranslations('catalog')
	const [tracks, cars, lego, instruments, beans] = await Promise.all([
		getTrackCosmetics(),
		getCarCosmetics(locale),
		getLegoCosmetics(),
		getInstrumentCosmetics(locale),
		getBeanCosmetics(locale)
	])

	return (
		<PageContainer>
			<SectionHeading>{t('title')}</SectionHeading>
			<CatalogTabs
				tracks={tracks}
				cars={cars}
				lego={lego}
				instruments={instruments}
				beans={beans}
			/>
		</PageContainer>
	)
}
