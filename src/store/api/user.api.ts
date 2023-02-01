import { api } from './api'
import { IUser } from '@/types/user.type'
import { ProfileType } from '@/types/profile.type'
import { LinkedAccounts } from '@/types/linked-accounts.type'

export const userApi = api.injectEndpoints({
	endpoints: builder => ({
		getProfile: builder.query<IUser, any>({
			query: () => '/profile',
			providesTags: () => [{ type: 'Profile' }]
		}),
		userActivate: builder.query<any, string>({
			query: (params: string) => `/user/activate${params}`
		}),
		userUpdateProfile: builder.mutation<string, ProfileType>({
			query: (profile: ProfileType) => ({
				url: `/profile`,
				method: 'PATCH',
				body: {
					country: profile.country,
					avatar: profile.avatar,
					fullName: profile.fullName
				}
			})
		}),
		userUpdateSN: builder.mutation<string, LinkedAccounts>({
			query: (accounts: LinkedAccounts) => ({
				url: `/profile/sn`,
				method: 'PATCH',
				body: {
					youtube: accounts.youtube,
					twitch: accounts.twitch,
					twitter: accounts.twitter,
					instagram: accounts.instagram,
					telegram: accounts.telegram
				}
			})
		})

	})
})

export const {
	useGetProfileQuery,
	useUserActivateQuery,
	useUserUpdateSNMutation,
	useUserUpdateProfileMutation
} = userApi
