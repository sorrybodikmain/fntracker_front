import React, { FC } from 'react'
import Layout from '@/components/Layout'
import FavoriteList from '@/components/user/subscriptions/FavoriteList'
import { Navigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

const SubscriptionPage: FC = () => {
	const { t } = useTranslation('user-profile')
	const { accessToken } = useAuth()

	if (!accessToken)
		return <Navigate to={'/user/login'} />

	return (
		<>
			<Helmet>
				<title>{t('favorite_title')} | FNTracker</title>
			</Helmet>

			<Layout>
				<FavoriteList />
			</Layout>
		</>)
}

export default SubscriptionPage
