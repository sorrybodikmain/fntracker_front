import React, { FC } from 'react'
import RecoveryForms from '@/components/user/recovery/RecoveryForms'
import { useTranslation } from 'react-i18next'
import AppHelmet from '@/components/AppHelmet'

const RecoveryPage: FC = () => {
	const { t } = useTranslation('user-recovery')
	return (
		<>
			<AppHelmet title={t('title')}/>
			<RecoveryForms />
		</>
	)
}

export default RecoveryPage
