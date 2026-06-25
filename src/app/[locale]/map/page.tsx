import { getLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { pageTitle } from '@/config/site'
import { MapView } from '@/components/map/MapView'
import { getMap } from '@/lib/api/fortnite'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('compare-maps')
	return {
		title: pageTitle(t('pageTitle')),
		description: t('pageDesc')
	}
}

export default async function MapPage() {
	const locale = await getLocale()
	const map = await getMap(locale)
	return <MapView map={map} />
}
