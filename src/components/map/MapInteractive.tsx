'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import type { BRMap } from '@/types/fnapi'
import { ZoomableImage } from '@/components/shared/ZoomableImage'
import { Tabs } from '@/components/ui/Tabs'
import { Input } from '@/components/ui/Input'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'

interface MapInteractiveProps {
	map: BRMap
}

type MapView = 'blank' | 'pois'

export function MapInteractive({ map }: MapInteractiveProps) {
	const t = useTranslations('compare-maps')
	const [view, setView] = useState<MapView>('pois')
	const [query, setQuery] = useState('')

	const pois = useMemo(() => {
		const list = map.pois ?? []
		const q = query.trim().toLowerCase()
		if (!q) return list
		return list.filter(poi => poi.name?.toLowerCase().includes(q))
	}, [map.pois, query])

	const imageSrc = view === 'pois' ? map.images.pois : map.images.blank

	const viewTabs = [
		{ id: 'blank', label: t('view_blank') },
		{ id: 'pois', label: t('view_pois') }
	]

	return (
		<div className=':uno: space-y-6'>
			<div className=':uno: flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
				<p className=':uno: text-sm text-muted max-w-xl'>{t('pageDesc')}</p>
				<Tabs
					tabs={viewTabs}
					activeId={view}
					onChange={id => setView(id as MapView)}
				/>
			</div>

			<div className=':uno: relative overflow-hidden rounded-2xl border border-primary/20 bg-surface shadow-glass'>
				<div
					className=':uno: absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none'
					aria-hidden
				/>
				<ZoomableImage
					src={imageSrc}
					alt='Fortnite map'
					width={1200}
					height={1200}
					className=':uno: relative z-10 w-full h-auto'
					priority
				/>
				<p className=':uno: absolute bottom-3 right-3 z-20'>
					<Badge variant='muted'>{t('zoom_hint')}</Badge>
				</p>
			</div>

			<GlassPanel className=':uno: p-5'>
				<div className=':uno: flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4'>
					<SectionHeading className=':uno: mb-0'>{t('showNames')}</SectionHeading>
					<Badge variant='primary'>
						{t('poi_count', { count: map.pois?.length ?? 0 })}
					</Badge>
				</div>
				<Input
					type='search'
					value={query}
					onChange={e => setQuery(e.target.value)}
					placeholder={t('poi_search')}
					className=':uno: mb-4'
				/>
				<div className=':uno: grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-80 overflow-y-auto'>
					{pois.map(poi => (
						<div
							key={poi.id}
							className=':uno: rounded-lg border border-white/8 bg-surface px-3 py-2 text-sm text-foreground hover:border-primary/30 hover:text-primary transition truncate cursor-default'
							title={poi.name}
						>
							{poi.name}
						</div>
					))}
				</div>
			</GlassPanel>
		</div>
	)
}
