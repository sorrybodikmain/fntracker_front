import React, { FC } from 'react'
import Layout from '@/components/Layout'
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

			<Layout>
				<RecoveryForms />
			</Layout>
		</>
	)
}

export default RecoveryPage
