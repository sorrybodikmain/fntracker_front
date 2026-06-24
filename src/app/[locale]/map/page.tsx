import { getLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { MapView } from '@/components/map/MapView'
import { getMap } from '@/lib/api/fortnite'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('compare-maps')
	return {
		title: `${t('pageTitle')} | FNTracker`,
		description: t('pageDesc')
	}
}

export default async function MapPage() {
	const locale = await getLocale()
	const map = await getMap(locale)
	return <MapView map={map} />
}
