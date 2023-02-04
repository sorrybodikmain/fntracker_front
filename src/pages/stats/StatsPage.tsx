import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { defaultFetcher, fetcher, patchFetcher } from '@/libs/apiFetcher'
import ProfileCard from '@/components/stats/ProfileCard'
import ModesStats from '@/components/stats/ModesStats'
import EventsStats from '@/components/stats/EventsStats'
import SeasonStats from '@/components/stats/SeasonStats'
import NotFountError from '@/components/stats/NotFountError'
import useSWR from 'swr'
import SkeletonCard from '@/components/stats/SkeletonCard'
import { ProfileResponse } from '@/types/profile.type'
import { AccountIdStr, AccountStatsResponse, PrResponse } from '@/types/user-stats.type'
import { useTranslation } from 'react-i18next'
import AppHelmet from '@/components/AppHelmet'

const StatsPage: FC = () => {
	const { nickname } = useParams()
	const { t } = useTranslation('stats')
	const { data: idCheck } = useSWR<AccountIdStr>(
		'https://fortniteapi.io/v1/lookup?username=' + nickname,
		fetcher
	)
	const { data } = useSWR<AccountStatsResponse>(
		'https://fortniteapi.io/v1/stats?account=' + idCheck?.account_id,
		fetcher
	)
	const pr = useSWR<PrResponse>(
		`https://api.fntracker.pp.ua/pr?platform=PC&region=EU&egsName=${nickname}`,
		defaultFetcher
	)
	const profileData = useSWR<ProfileResponse>(
		`https://api.fntracker.pp.ua/profile/${idCheck?.account_id}`,
		defaultFetcher
	)
	useEffect(() => {
		(async () => {
			await patchFetcher(`https://api.fntracker.pp.ua/profile/${idCheck?.account_id}/increment`)
		})()
	}, [idCheck])

	return (
		<>
			<AppHelmet
				title={t('title', { nickname })}
			/>
			<>
				{
					idCheck?.result === false && data ?
						<NotFountError /> :
						<>
							{profileData.data && data ?
								<ProfileCard profileData={profileData.data.profile!} nickname={nickname!}
														 views={profileData.data.viewsCount} />
								: <SkeletonCard />
							}
							{data ? <EventsStats data={pr?.data?.data} /> : <SkeletonCard />}
							{
								data?.accountLevelHistory ?
									<SeasonStats data={data!} />
									: <SkeletonCard />
							}
							{data?.global_stats ?
								<ModesStats data={data!} />
								: <SkeletonCard />
							}
						</>
				}

			</>
		</>
	)
}

export default StatsPage
