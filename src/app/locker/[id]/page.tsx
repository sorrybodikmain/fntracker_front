import { getLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AboutItemCard } from '@/components/locker/AboutItemCard'
import { ItemDataTable } from '@/components/locker/ItemDataTable'
import { LockerGallery } from '@/components/locker/gallery/LockerGallery'
import { getItem } from '@/lib/api/fortnite'
import type { ShopItemResponse } from '@/interfaces'

interface ItemPageProps {
	params: Promise<{ id: string }>
}

export async function generateMetadata({
	params
}: ItemPageProps): Promise<Metadata> {
	const { id } = await params
	const locale = await getLocale()
	const data = (await getItem(id, locale)) as ShopItemResponse

	return {
		title: `${data?.item?.name || 'Locker'} | FNTracker`,
		description: data?.item?.description,
		openGraph: {
			images: data?.item?.images?.background
				? [{ url: data.item.images.background }]
				: undefined
		}
	}
}

export default async function ItemPage({ params }: ItemPageProps) {
	const { id } = await params
	const locale = await getLocale()
	const data = (await getItem(id, locale)) as ShopItemResponse

	if (!data?.result) notFound()

	return (
		<div className=':uno: container text-white mx-auto p-3 min-h-screen'>
			<AboutItemCard data={data} />
			{data.item.displayAssets.length > 1 && (
				<LockerGallery data={data.item.displayAssets} />
			)}
			{data.item.shopHistory && <ItemDataTable data={data} />}
		</div>
	)
}
