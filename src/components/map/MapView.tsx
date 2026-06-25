import { getTranslations } from 'next-intl/server'
import type { BRMap } from '@/types/fnapi'
import { MapInteractive } from './MapInteractive'
import { PageContainer } from '@/components/ui/PageContainer'
import { SectionHeading } from '@/components/ui/SectionHeading'

interface MapViewProps {
	map: BRMap
}

export async function MapView({ map }: MapViewProps) {
	const t = await getTranslations('compare-maps')

	return (
		<PageContainer>
			<SectionHeading subtitle={t('pageDesc')}>{t('pageTitle')}</SectionHeading>
			<MapInteractive map={map} />
		</PageContainer>
	)
}
