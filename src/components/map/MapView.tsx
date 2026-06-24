import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { BRMap } from '@/types/fnapi'

interface MapViewProps {
	map: BRMap
}

export async function MapView({ map }: MapViewProps) {
	const t = await getTranslations('compare-maps')

	return (
		<section id='map-image'>
			<div className=':uno: container mx-auto text-white py-3 min-h-screen'>
				<div className=':uno: mx-auto rounded-xl relative max-w-4xl'>
					<h1 className=':uno: border-l-4 border-primary pl-2 mb-4'>
						{t('pageTitle')}
					</h1>
					<Image
						src={map.images.blank}
						alt='Fortnite map'
						width={1200}
						height={1200}
						className=':uno: rounded-xl w-full h-auto'
						priority
					/>
				</div>
			</div>
		</section>
	)
}
