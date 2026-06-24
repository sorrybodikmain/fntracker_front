import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { MapsCompare } from '@/components/map/MapsCompare'
import { getMapsList } from '@/lib/api/fortnite'
import type { MapsResponse } from '@/interfaces'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('compare-maps')
	return {
		title: `${t('pageTitle')} | FNTracker`,
		description: t('pageDesc'),
		openGraph: {
			images: [
				{
					url: 'https://media.fortniteapi.io/images/maps/map-23.30.png?width=800'
				}
			]
		}
	}
}

export default async function MapComparePage() {
	const data = (await getMapsList()) as MapsResponse
	return <MapsCompare maps={data.maps} />
}
