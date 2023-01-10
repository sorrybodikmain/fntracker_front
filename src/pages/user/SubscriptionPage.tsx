import { FC } from 'react'
import Layout from '@/components/Layout'
import FavoriteList from '@/components/user/subscriptions/FavoriteList'

const SubscriptionPage: FC = () => {

	return (
		<Layout>
				<FavoriteList />
		</Layout>
	)
}

export default SubscriptionPage
