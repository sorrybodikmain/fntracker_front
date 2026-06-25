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
import { Tabs } from '@/components/ui/Tabs'
import { Card } from '@/components/ui/Card'

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

const tabIds: CatalogTab[] = ['tracks', 'cars', 'lego', 'instruments', 'beans']

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
	const tabs = tabIds.map(tab => ({ id: tab, label: t(`tab_${tab}`) }))

	return (
		<div>
			<Tabs
				tabs={tabs}
				activeId={active}
				onChange={id => setActive(id as CatalogTab)}
				className=':uno: mb-6'
			/>
			<div className=':uno: grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-5'>
				{items.map(item => (
					<Card key={item.id} hover className=':uno: overflow-hidden'>
						<div className=':uno: relative w-full aspect-square'>
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
						<p className=':uno: text-xs p-2 text-center text-foreground truncate'>
							{item.name}
						</p>
					</Card>
				))}
			</div>
		</div>
	)
}
