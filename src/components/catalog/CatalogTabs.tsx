'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type {
	BeanCosmeticsList,
	CarCosmeticsList,
	InstrumentCosmeticsList,
	LegoCosmeticsList,
	TrackCosmeticsList
} from '@/types/fnapi'

type CatalogTab = 'tracks' | 'cars' | 'lego' | 'instruments' | 'beans'

interface CatalogItem {
	id: string
	name: string
	image?: string
}

interface CatalogTabsProps {
	tracks: TrackCosmeticsList
	cars: CarCosmeticsList
	lego: LegoCosmeticsList
	instruments: InstrumentCosmeticsList
	beans: BeanCosmeticsList
}

const tabs: CatalogTab[] = ['tracks', 'cars', 'lego', 'instruments', 'beans']

function mapTracks(tracks: TrackCosmeticsList): CatalogItem[] {
	return (tracks ?? []).map(item => ({
		id: item.id,
		name: item.title ?? item.id,
		image: item.albumArt
	}))
}

function mapWithImages(
	items: {
		id: string
		name?: string
		images?: { large?: string; small?: string }
	}[]
): CatalogItem[] {
	return (items ?? []).map(item => ({
		id: item.id,
		name: item.name ?? item.id,
		image: item.images?.large ?? item.images?.small
	}))
}

function mapLego(lego: LegoCosmeticsList): CatalogItem[] {
	return (lego ?? []).map(item => ({
		id: item.id,
		name: item.cosmeticId,
		image: item.images?.large ?? item.images?.small ?? item.images?.wide
	}))
}

export function CatalogTabs({
	tracks,
	cars,
	lego,
	instruments,
	beans
}: CatalogTabsProps) {
	const t = useTranslations('catalog')
	const [active, setActive] = useState<CatalogTab>('tracks')

	const itemsByTab: Record<CatalogTab, CatalogItem[]> = {
		tracks: mapTracks(tracks),
		cars: mapWithImages(cars),
		lego: mapLego(lego),
		instruments: mapWithImages(instruments),
		beans: mapWithImages(beans)
	}

	const items = itemsByTab[active].slice(0, 60)

	return (
		<div>
			<div className=':uno: flex flex-wrap gap-2 mb-4'>
				{tabs.map(tab => (
					<button
						key={tab}
						type='button'
						onClick={() => setActive(tab)}
						className={`:uno: px-3 py-1.5 rounded-lg text-sm transition ${active === tab
							? 'bg-primary text-white'
							: 'bg-gray-700 text-gray-300 hover:bg-gray-600'
							}`}
					>
						{t(`tab_${tab}`)}
					</button>
				))}
			</div>
			<div className=':uno: grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-6'>
				{items.map(item => (
					<div
						key={item.id}
						className=':uno: rounded-lg bg-gray-600 overflow-hidden hover:scale-[1.02] transition'
					>
						<div className=':uno: relative w-full h-32'>
							{item.image ? (
								<Image
									src={item.image}
									alt={item.name}
									fill
									className=':uno: object-cover'
									sizes='150px'
								/>
							) : null}
						</div>
						<p className=':uno: text-white text-xs p-2 text-center'>{item.name}</p>
					</div>
				))}
			</div>
		</div>
	)
}
