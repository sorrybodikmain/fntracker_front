import { FC } from 'react'
import Layout from '@/components/layout/Layout'
// import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { fetcher } from '@/lib/apiFetcher'
import { AccountId, AccountStats } from '@/api/types/user-stats.type'

const Stats: FC = () => {
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

export default Stats
