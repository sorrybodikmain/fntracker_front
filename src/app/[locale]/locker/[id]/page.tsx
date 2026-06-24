import { getLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AboutItemCard } from '@/components/locker/AboutItemCard'
import { ItemDataTable } from '@/components/locker/ItemDataTable'
import { getCosmetic } from '@/lib/api/fortnite'
import { cosmeticDisplayImage } from '@/utils/cosmetic'

interface ItemPageProps {
	params: Promise<{ id: string }>
}

export async function generateMetadata({
	params
}: ItemPageProps): Promise<Metadata> {
	const { id } = await params
	const locale = await getLocale()
	const cosmetic = await getCosmetic(id, locale)

	return {
		title: `${cosmetic.name} | FNTracker`,
		description: cosmetic.description,
		openGraph: {
			images: [{ url: cosmeticDisplayImage(cosmetic) }]
		}
	}
}

export default async function ItemPage({ params }: ItemPageProps) {
	const { id } = await params
	const locale = await getLocale()
	const cosmetic = await getCosmetic(id, locale)

	if (!cosmetic?.id) notFound()

	return (
		<div className=':uno: container text-white mx-auto p-3 min-h-screen'>
			<AboutItemCard cosmetic={cosmetic} />
			<ItemDataTable cosmetic={cosmetic} />
		</div>
	)
}
