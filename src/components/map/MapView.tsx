import { getTranslations } from 'next-intl/server'
import type { BRMap } from '@/types/fnapi'
import { MapInteractive } from './MapInteractive'

interface MapViewProps {
	map: BRMap
}

export async function MapView({ map }: MapViewProps) {
	const t = await getTranslations('compare-maps')

	return (
		<section id='map-image'>
			<div className=':uno: container mx-auto text-white py-6 px-3 min-h-screen'>
				<h1 className=':uno: border-l-4 border-primary pl-3 text-2xl font-bold mb-6'>
					{t('pageTitle')}
				</h1>
				<MapInteractive map={map} />
			</div>
		</section>
	)
}
