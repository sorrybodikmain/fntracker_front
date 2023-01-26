import React from 'react'
import Layout from '@/components/Layout'
import { Navigate } from 'react-router'
import ProfileCard from '@/components/stats/ProfileCard'
import SNEditForm from '@/components/user/profile/SNEditForm'
import ProfileEditForm from '@/components/user/profile/ProfileEditForm'
import { fetcher } from '@/libs/apiFetcher'
import { useAuth } from '@/hooks/useAuth'
import useSWR from 'swr'
import { AccountStatsResponse } from '@/types/user-stats.type'

export default function ProfilePage() {
	const { user } = useAuth()
	const { data } = useSWR<AccountStatsResponse>(
		'https://fortniteapi.io/v1/stats?account=' + user?.profile?.egsId,
		fetcher
	)
	if (!user)
		return <Navigate to={'/user/login'} />

	return (
		<Layout>
			<div className={'min-h-screen'}>
				<ProfileCard profileData={user.profile!} nickname={data?.name} />
				<ProfileEditForm />
				<SNEditForm />
			</div>
		</Layout>
	)
}