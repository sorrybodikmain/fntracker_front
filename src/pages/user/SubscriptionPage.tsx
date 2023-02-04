import React, { FC } from 'react'
import FavoriteList from '@/components/user/subscriptions/FavoriteList'
import { Navigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from 'react-i18next'
import AppHelmet from '@/components/AppHelmet'

const SubscriptionPage: FC = () => {
	const { t } = useTranslation('user-profile')
	const { accessToken } = useAuth()

	if (!accessToken)
		return <Navigate to={'/user/login'} />

	return (
		<>
			<AppHelmet title={t('favorite_title')} />
			<FavoriteList />
		</>)
}

export default SubscriptionPage
