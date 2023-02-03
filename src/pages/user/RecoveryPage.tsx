import React, { FC } from 'react'
import RecoveryForms from '@/components/user/recovery/RecoveryForms'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

const RecoveryPage: FC = () => {
	const { t } = useTranslation('user-recovery')
	return (
		<>
			<Helmet>
				<title>{t('title')} | FNTracker</title>
			</Helmet>
			<RecoveryForms />
		</>
	)
}

export default RecoveryPage
