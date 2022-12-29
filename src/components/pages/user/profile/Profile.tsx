import React from 'react'
import Layout from '@/components/layout/Layout'
import { useTranslation } from 'react-i18next'

export default function Profile()
{
	const { t } = useTranslation("common")

	return (
		<Layout>
			user
		</Layout>
	)
}