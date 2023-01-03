import { FC } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { AccountStatsResponse, PrResponse } from '@/api/types/user-stats.type'
import { fetcher, pr_fetcher } from '@/libs/apiFetcher'
import Layout from '@/components/Layout'
import ProfileCard from '@/components/stats/ProfileCard'
import ModesStats from '@/components/stats/ModesStats'
import EventsStats from '@/components/stats/EventsStats'
import SeasonStats from '@/components/stats/SeasonStats'
import NotFountError from '@/components/stats/NotFountError'

const StatsPage: FC = () => {
	const { nickname } = useParams()
	const { data } = useSWR<AccountStatsResponse>(
		'https://fortniteapi.io/v1/stats?username=' + nickname,
		fetcher
	)
	const pr = useSWR<PrResponse>(
		'https://api.fntracker.pp.ua/pr?platform=PC&region=EU&egsName=' + nickname,
		pr_fetcher
	)
	return (
		<>
			<Layout>
				{
					data?.result === false ?
						<NotFountError /> :
						<>
							<ProfileCard data={data!} />
							{
								pr?.data ?
									<EventsStats data={pr.data?.data} />
									: null
							}

							{
								data?.accountLevelHistory ?
									<SeasonStats data={data!} />
									: null
							}
							{data?.global_stats ?
								<ModesStats data={data!} />
								: null
							}
						</>
				}

			</Layout>
		</>
	)
}

export default StatsPage
