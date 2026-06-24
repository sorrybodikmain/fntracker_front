'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import type { BRMap } from '@/types/fnapi'
import { ZoomableImage } from '@/components/shared/ZoomableImage'

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

	const imageSrc =
		view === 'pois' ? map.images.pois : map.images.blank

	return (
		<div className=':uno: space-y-6'>
			<div className=':uno: flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
				<p className=':uno: text-sm text-gray-400 max-w-xl'>{t('pageDesc')}</p>
				<div className=':uno: flex rounded-lg bg-gray-800 p-1 self-start'>
					<button
						type='button'
						onClick={() => setView('blank')}
						className={`:uno: px-4 py-1.5 rounded-md text-sm transition ${view === 'blank'
							? 'bg-primary text-white'
							: 'text-gray-400 hover:text-white'
							}`}
					>
						{t('view_blank')}
					</button>
					<button
						type='button'
						onClick={() => setView('pois')}
						className={`:uno: px-4 py-1.5 rounded-md text-sm transition ${view === 'pois'
							? 'bg-primary text-white'
							: 'text-gray-400 hover:text-white'
							}`}
					>
						{t('view_pois')}
					</button>
				</div>
			</div>

			<div className=':uno: relative overflow-hidden rounded-2xl border border-gray-700/80 bg-gray-800/50 shadow-2xl'>
				<div className=':uno: absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 pointer-events-none' />
				<ZoomableImage
					src={imageSrc}
					alt='Fortnite map'
					width={1200}
					height={1200}
					className=':uno: relative z-10 w-full h-auto'
					priority
				/>
				<p className=':uno: absolute bottom-3 right-3 z-20 rounded-full bg-black/60 px-3 py-1 text-xs text-gray-300'>
					{t('zoom_hint')}
				</p>
			</div>

			<div className=':uno: rounded-xl border border-gray-700/60 bg-gray-800/40 p-4'>
				<div className=':uno: flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4'>
					<h2 className=':uno: text-lg font-semibold text-white'>
						{t('showNames')}
					</h2>
					<span className=':uno: text-sm text-gray-400'>
						{t('poi_count', { count: map.pois?.length ?? 0 })}
					</span>
				</div>
				<input
					type='search'
					value={query}
					onChange={e => setQuery(e.target.value)}
					placeholder={t('poi_search')}
					className=':uno: w-full h-9 bg-gray-700/80 rounded-lg px-3 text-sm text-white placeholder:text-gray-500 hover:bg-gray-600/80 transition mb-4'
				/>
				<div className=':uno: grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-80 overflow-y-auto pr-1'>
					{pois.map(poi => (
						<div
							key={poi.id}
							className=':uno: rounded-lg bg-gray-700/60 px-3 py-2 text-sm text-gray-200 hover:bg-gray-600/60 transition truncate'
							title={poi.name}
						>
							{poi.name}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
