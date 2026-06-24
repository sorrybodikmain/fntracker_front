import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import {
	lookupPlayer,
	getStats
} from '@/lib/api/fortnite'
import {
	getPr,
	getProfile,
	incrementProfileViews
} from '@/lib/api/fntracker'
import { ProfileCard } from '@/components/stats/ProfileCard'
import { EventsStats } from '@/components/stats/EventsStats'
import { SeasonStats } from '@/components/stats/SeasonStats'
import { ModesStats } from '@/components/stats/ModesStats'
import { NotFountError } from '@/components/stats/NotFountError'
import type {
	AccountIdStr,
	AccountStatsResponse,
	PrResponse,
	ProfileResponse
} from '@/interfaces'

interface StatsPageProps {
	params: Promise<{ nickname: string }>
}

export async function generateMetadata({
	params
}: StatsPageProps): Promise<Metadata> {
	const { nickname } = await params
	const t = await getTranslations('stats')
	return { title: `${t('title', { nickname })} | FNTracker` }
}

export default async function StatsPage({ params }: StatsPageProps) {
	const { nickname } = await params
	const idCheck = (await lookupPlayer(nickname)) as AccountIdStr

	if (!idCheck?.result || !idCheck?.account_id) {
		return <NotFountError />
	}

	const [stats, pr, profileData] = await Promise.all([
		getStats(idCheck.account_id) as Promise<AccountStatsResponse>,
		getPr(nickname) as Promise<PrResponse>,
		getProfile(idCheck.account_id) as Promise<ProfileResponse>
	])

	incrementProfileViews(idCheck.account_id).catch(() => {})

	return (
		<>
			{profileData?.profile && stats ? (
				<ProfileCard
					profileData={profileData.profile}
					nickname={nickname}
					views={profileData.viewsCount}
				/>
			) : null}
			{stats ? <EventsStats data={pr?.data} /> : null}
			{stats?.accountLevelHistory ? <SeasonStats data={stats} /> : null}
			{stats?.global_stats ? <ModesStats data={stats} /> : null}
		</>
	)
}
