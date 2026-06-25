import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { pageTitle } from '@/config/site'
import {
	getBrStats,
	getBrStatsByAccountId,
	isAccountId
} from '@/lib/api/fortnite'
import { StatsProfileCard } from '@/components/stats/StatsProfileCard'
import { ModesStats } from '@/components/stats/ModesStats'
import { NotFountError } from '@/components/stats/NotFountError'
import { PageContainer } from '@/components/ui/PageContainer'

interface StatsPageProps {
	params: Promise<{ nickname: string }>
}

export async function generateMetadata({
	params
}: StatsPageProps): Promise<Metadata> {
	const { nickname } = await params
	const t = await getTranslations('stats')
	return { title: pageTitle(t('title', { nickname })) }
}

export default async function StatsPage({ params }: StatsPageProps) {
	const { nickname: rawNickname } = await params
	const nickname = decodeURIComponent(rawNickname)

	let stats
	try {
		stats = isAccountId(nickname)
			? await getBrStatsByAccountId(nickname)
			: await getBrStats(nickname)
	} catch {
		return (
			<PageContainer>
				<NotFountError />
			</PageContainer>
		)
	}

	return (
		<PageContainer>
			<StatsProfileCard
				stats={stats}
				nickname={stats.account?.name ?? nickname}
			/>
			<ModesStats stats={stats} />
		</PageContainer>
	)
}
