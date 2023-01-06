import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AccountStatsResponse, ProfileResponse, PrResponse } from '@/api/types/user-stats.type'
import { fetcher, patch_fetcher, pr_fetcher } from '@/libs/apiFetcher'
import Layout from '@/components/Layout'
import ProfileCard from '@/components/stats/ProfileCard'
import ModesStats from '@/components/stats/ModesStats'
import EventsStats from '@/components/stats/EventsStats'
import SeasonStats from '@/components/stats/SeasonStats'
import NotFountError from '@/components/stats/NotFountError'

const StatsPage: FC = () => {
	const { nickname } = useParams()

	// const res = Promise.all<AccountStatsResponse, PrResponse, ProfileResponse>([
	// 	fetcher('https://fortniteapi.io/v1/stats?username=' + nickname)
	// 		.then(res => res),
	// 	pr_fetcher('https://api.fntracker.pp.ua/pr?platform=PC&region=EU&egsName=' + nickname)
	// 		.then(res => res),
	// 	pr_fetcher('https://api.fntracker.pp.ua/profile/' + nickname)
	// 		.then(res => res)
	// ])
	// console.log(res)


	useEffect(() => {
		patch_fetcher(`https://api.fntracker.pp.ua/profile/${nickname}/increment`).then()
	}, [])

	return (
		<>
			<Layout>
				{/*{*/}
				{/*	data?.result === false ?*/}
				{/*		<NotFountError /> :*/}
				{/*		<>*/}
				{/*			<ProfileCard data={data!} profile={profile.data!} />*/}
				{/*			{*/}
				{/*				pr?.data ?*/}
				{/*					<EventsStats data={pr.data?.data} />*/}
				{/*					: null*/}
				{/*			}*/}

				{/*			{*/}
				{/*				data?.accountLevelHistory ?*/}
				{/*					<SeasonStats data={data!} />*/}
				{/*					: null*/}
				{/*			}*/}
				{/*			{data?.global_stats ?*/}
				{/*				<ModesStats data={data!} />*/}
				{/*				: null*/}
				{/*			}*/}
				{/*		</>*/}
				{/*}*/}

			</Layout>
		</>
	)
}

export default StatsPage
