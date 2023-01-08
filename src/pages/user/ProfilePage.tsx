import React, { useContext } from 'react'
import Layout from '@/components/Layout'
import { Context } from '../../index'
import { Navigate } from 'react-router'
import ProfileCard from '@/components/stats/ProfileCard'
import ProfileEditForm from '@/components/user/profile/ProfileEditForm'

export default function ProfilePage() {
	const { store } = useContext(Context)
	if (!store.isAuth)
		return <Navigate to={'/user/login'} />

	return (
		<Layout>
			<div className={'min-h-screen'}>
				<ProfileCard
					profileData={store.user.profile!}
					nickname={store.user.profile?.egsId}
					title={'Profile Preview'}
				/>
				<ProfileEditForm />
			</div>


		</Layout>
	)
}