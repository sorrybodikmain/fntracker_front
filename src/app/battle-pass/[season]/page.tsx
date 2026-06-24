import { getLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ShopSection } from '@/components/shop/ShopSection'
import { BPCard } from '@/components/battle-pass/bpcard/BPCard'
import { BPVideoCard } from '@/components/battle-pass/BPVideoCard'
import { getBattlePass } from '@/lib/api/fortnite'
import type { IBattlePassResponse } from '@/interfaces'

interface BattlePassPageProps {
	params: Promise<{ season: string }>
}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('battle-pass')
	return {
		title: `${t('bp_card_title')} | FNTracker`,
		description: t('bp_card_title')
	}
}

export default async function BattlePassPage({ params }: BattlePassPageProps) {
	const { season } = await params
	const locale = await getLocale()
	const t = await getTranslations('battle-pass')
	const data = (await getBattlePass(locale, season)) as IBattlePassResponse
	const rewards = data.rewards?.map(i => i.item) ?? []

	return (
		<div className=':uno: container mx-auto text-white p-3 min-h-screen'>
			<BPCard data={data} />
			<BPVideoCard videos={data.videos} />
			<ShopSection
				items={rewards}
				sectionName={t('rewards_card_title')}
			/>
		</div>
	)
}
