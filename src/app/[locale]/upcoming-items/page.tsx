import { getLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { CosmeticItem } from '@/components/shop/CosmeticItem'
import { PageContainer } from '@/components/ui/PageContainer'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getNewCosmetics } from '@/lib/api/fortnite'
import { cosmeticInstanceId, dedupeCosmeticsById } from '@/utils/cosmetic'

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

	const items = dedupeCosmeticsById(data.items.br)

	return (
		<PageContainer>
			<SectionHeading>{t('upcoming_title')}</SectionHeading>
			<div className=':uno: grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-5'>
				{items.map((cosmetic, index) => (
					<CosmeticItem
						key={cosmeticInstanceId(cosmetic, index)}
						instanceId={cosmeticInstanceId(cosmetic, index)}
						cosmetic={cosmetic}
						likeLabel={t('like_item', { name: cosmetic.name })}
						unlikeLabel={t('unlike_item', { name: cosmetic.name })}
					/>
				))}
			</div>
		</PageContainer>
	)
}
