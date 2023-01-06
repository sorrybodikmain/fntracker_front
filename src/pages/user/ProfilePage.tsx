import React, { useContext } from 'react'
import Layout from '@/components/Layout'
import { Context } from '../../index'

export default function ProfilePage() {
	const { store } = useContext(Context)
	return (
		<Layout>
			{store.user.createdAt!.toString()}
		</Layout>
	)
}