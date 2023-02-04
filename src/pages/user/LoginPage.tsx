import React, { FC } from 'react'
import LoginForm from '@/components/user/LoginForm'
import { useTranslation } from 'react-i18next'
import AppHelmet from '@/components/AppHelmet'

const LoginPage: FC = () => {
	const { t } = useTranslation('user-auth')
	return (
		<>
			<AppHelmet title={t('registration')} desc={t('auth_body')!}/>
			<LoginForm />
		</>
	)
}

export default LoginPage
