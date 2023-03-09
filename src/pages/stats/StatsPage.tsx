import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { defaultFetcher, fetcher, patchFetcher } from '@/libs/apiFetcher'
import ProfileCard from '@/components/stats/ProfileCard'
import ModesStats from '@/components/stats/ModesStats'
import EventsStats from '@/components/stats/EventsStats'
import SeasonStats from '@/components/stats/SeasonStats'
import NotFountError from '@/components/stats/NotFountError'
import SkeletonCard from '@/components/stats/SkeletonCard'
import { ProfileResponse } from '@/types/profile.type'
import { AccountIdStr, AccountStatsResponse, PrResponse } from '@/types/user-stats.type'
import { useTranslation } from 'react-i18next'
import AppHelmet from '@/components/AppHelmet'

const StatsPage: FC = () => {
	const { nickname } = useParams()
	const { t } = useTranslation('stats')
	const [stats, setStats] = useState({})
	const [profileData, setProfileData] = useState({})
	
	const { data: idCheck } = useSWR<AccountIdStr>(
		'https://fortniteapi.io/v1/lookup?username=' + nickname,
		fetcher
	)
	const pr = useSWR<PrResponse>(
		`https://api.fntracker.pp.ua/pr?platform=PC&region=EU&egsName=${nickname}`,
		defaultFetcher
	)
	useEffect(() => {
		(async () => {
			const statsResponse = await fetcher('https://fortniteapi.io/v1/stats?account=' + idCheck?.account_id)
			const profileResponse = await defaultFetcher(`https://api.fntracker.pp.ua/profile/${idCheck?.account_id}`)
			await patchFetcher(`https://api.fntracker.pp.ua/profile/${idCheck?.account_id}/increment`)
			setStats(statsResponse)
			setProfileData(profileResponse)
		})()
	}, [idCheck])

	return (
		<>
			<AppHelmet
				title={t('title', { nickname })}
			/>
			<>
				{
					idCheck?.result === false && stats ?
						<NotFountError /> :
						<>
							{profileData?.data && stats ?
								<ProfileCard
									profileData={profileData?.data?.profile!}
									nickname={nickname!}
									views={profileData?.data?.viewsCount} />
								: <SkeletonCard />
							}
							{stats ? <EventsStats data={pr?.data?.data} /> : <SkeletonCard />}
							{
								stats?.accountLevelHistory ?
									<SeasonStats data={stats!} />
									: <SkeletonCard />
							}
							{stats?.global_stats ?
								<ModesStats data={stats!} />
								: <SkeletonCard />
							}
						</>
				}

			</>
		</>
	)
}

export default StatsPage
