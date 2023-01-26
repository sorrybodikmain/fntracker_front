import React, { FC } from 'react'
import Layout from '@/components/Layout'
import FavoriteList from '@/components/user/subscriptions/FavoriteList'
import { Navigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'

const SubscriptionPage: FC = () => {
	const { accessToken } = useAuth()
	if (!accessToken)
		return <Navigate to={'/user/login'} />

	return (
		<Layout>
			<FavoriteList />
		</Layout>
	)
}

export default SubscriptionPage
