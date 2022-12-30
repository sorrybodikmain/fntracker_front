import { FC } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import {AccountId, AccountStats} from "@/api/types/user-stats.type";
import {fetcher} from '@/libs/apiFetcher';
import Layout from "@/components/Layout";

const StatsPage: FC = () => {
	const {nickname} = useParams()
	const { data } = useSWR<AccountId>(
		'https://fortniteapi.io/v1/lookup?username=' + nickname,
		fetcher
	)
	const all = useSWR<AccountStats>(
		'https://fortniteapi.io/v1/stats?account=' + data?.account_id,
		fetcher
	)
	return (
		<>
			<Layout>
				<div>{all?.data?.name}</div>
			</Layout>
		</>
	)
}

export default StatsPage
