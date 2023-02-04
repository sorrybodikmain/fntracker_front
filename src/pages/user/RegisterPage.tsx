import React, { FC } from 'react'
import RegisterForm from '@/components/user/RegisterForm'
import { useTranslation } from 'react-i18next'
import AppHelmet from '@/components/AppHelmet'

const RegisterPage: FC = () => {
	const { t } = useTranslation('user-auth')
	return (
		<>
			<AppHelmet title={t('registration')} desc={t('auth_body')!}/>
			<RegisterForm />
		</>
	)
}

export default RegisterPage
