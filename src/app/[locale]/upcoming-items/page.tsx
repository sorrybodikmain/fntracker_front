import { getLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { CosmeticItem } from '@/components/shop/CosmeticItem'
import { getNewCosmetics } from '@/lib/api/fortnite'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('shop')
	return {
		title: `${t('upcoming_title')} | FNTracker`,
		description: t('upcoming_title')
	}
}

export default async function UpcomingItemsPage() {
	const locale = await getLocale()
	const t = await getTranslations('shop')
	const data = await getNewCosmetics(locale)

	return (
		<div className=':uno: container mx-auto text-white p-3 min-h-screen'>
			<h1 className=':uno: border-l-4 border-primary text-md pl-2 my-4'>
				{t('upcoming_title')}
			</h1>
			<div className=':uno: grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-6'>
				{data.items.br.map(cosmetic => (
					<CosmeticItem
						key={cosmetic.id}
						cosmetic={cosmetic}
						likeLabel={t('like_item', { name: cosmetic.name })}
						unlikeLabel={t('unlike_item', { name: cosmetic.name })}
					/>
				))}
			</div>
		</div>
	)
}
