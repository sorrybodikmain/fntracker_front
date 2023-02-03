import React, { FC } from 'react'
import RegisterForm from '@/components/user/RegisterForm'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const RegisterPage: FC = () => {
	const { t } = useTranslation('user-auth')
	return (
		<>
			<Helmet>
				<title>{t('registration')} | FNTracker</title>
			</Helmet>
			<RegisterForm />
		</>
	)
}

export default RegisterPage
