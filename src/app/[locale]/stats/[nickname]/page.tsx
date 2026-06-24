import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { getBrStats } from '@/lib/api/fortnite'
import {
	getPr,
	getProfile,
	incrementProfileViews
} from '@/lib/api/fntracker'
import { ProfileCard } from '@/components/stats/ProfileCard'
import { StatsProfileCard } from '@/components/stats/StatsProfileCard'
import { EventsStats } from '@/components/stats/EventsStats'
import { ModesStats } from '@/components/stats/ModesStats'
import { NotFountError } from '@/components/stats/NotFountError'
import type { ProfileResponse } from '@/interfaces/profile.interface'
import type { PrResponse } from '@/interfaces/user-stats.interface'

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

	let stats
	try {
		stats = await getBrStats(nickname)
	} catch {
		return <NotFountError />
	}

	const accountId = stats.account.id

	const [pr, profileData] = await Promise.all([
		getPr(nickname) as Promise<PrResponse>,
		getProfile(accountId) as Promise<ProfileResponse>
	])

	incrementProfileViews(accountId).catch(() => { })

	return (
		<>
			{profileData?.profile ? (
				<ProfileCard
					profileData={profileData.profile}
					nickname={nickname}
					views={profileData.viewsCount}
				/>
			) : (
				<StatsProfileCard
					stats={stats}
					nickname={nickname}
					views={profileData?.viewsCount}
				/>
			)}
			<EventsStats data={pr?.data} />
			<ModesStats stats={stats} />
		</>
	)
}
