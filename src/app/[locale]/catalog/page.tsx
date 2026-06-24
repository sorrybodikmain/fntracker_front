import { getLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { CatalogTabs } from '@/components/catalog/CatalogTabs'
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
		<div className=':uno: container mx-auto text-white p-3 min-h-screen'>
			<h1 className=':uno: border-l-4 border-primary text-md pl-2 my-4'>
				{t('title')}
			</h1>
			<CatalogTabs
				tracks={tracks}
				cars={cars}
				lego={lego}
				instruments={instruments}
				beans={beans}
			/>
		</div>
	)
}
