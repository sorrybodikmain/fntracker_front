import React, { FC } from 'react'
import Layout from '@/components/Layout'
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
			<Layout>
				<LoginForm />
			</Layout>
		</>
	)
}

export default LoginPage
