import { FC } from 'react'
import Layout from '@/components/Layout'
import SubsItemList from '@/components/user/subscriptions/SubsItemList'

const SubscriptionPage: FC = () => {

	return (
		<Layout>
			<div className={'min-h-screen'}>
				<SubsItemList />
			</div>
		</Layout>
	)
}

export default SubscriptionPage
