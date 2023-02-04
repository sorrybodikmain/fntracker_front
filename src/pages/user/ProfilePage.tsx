import React from 'react'
import { Navigate } from 'react-router'
import ProfileCard from '@/components/stats/ProfileCard'
import SNEditForm from '@/components/user/profile/SNEditForm'
import ProfileEditForm from '@/components/user/profile/ProfileEditForm'
import { defaultFetcher, fetcher } from '@/libs/apiFetcher'
import { useAuth } from '@/hooks/useAuth'
import useSWR from 'swr'
import { AccountStatsResponse } from '@/types/user-stats.type'
import { useTranslation } from 'react-i18next'
import { ProfileResponse } from '@/types/profile.type'
import AppHelmet from '@/components/AppHelmet'

export default function ProfilePage() {
	const { user } = useAuth()
	const { t } = useTranslation('user-profile')
	const { data } = useSWR<AccountStatsResponse>(
		'https://fortniteapi.io/v1/stats?account=' + user?.profile?.egsId,
		fetcher
	)
	const profileData = useSWR<ProfileResponse>(
		`https://api.fntracker.pp.ua/profile/${user?.profile?.egsId}`,
		defaultFetcher
	)

	if (!user) {
		return <Navigate to={'/user/login'} />
	}

	return (
		<>
			<AppHelmet title={t('title')}/>
			<div>
				<div className='min-h-screen'>
					<ProfileCard profileData={user.profile! || profileData.data?.profile}
											 nickname={data?.name}
											 views={profileData.data?.viewsCount}
					/>
					<ProfileEditForm />
					<SNEditForm />
				</div>
			</div>
		</>
	)
}