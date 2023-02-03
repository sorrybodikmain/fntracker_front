import React, { FC } from 'react'
import LoginForm from '@/components/user/LoginForm'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

const LoginPage: FC = () => {
	const { t } = useTranslation('user-auth')
	return (
		<>
			<Helmet>
				<title>{t('login')} | FNTracker</title>
			</Helmet>
			<LoginForm />
		</>
	)
}

export default LoginPage
