import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { login, logout, register } from '@/store/auth/auth.actions'
import { IAuthInitialState } from '@/store/auth/auth.interface'
import { Subscription } from '@/types/subscription.type'
import { LinkedAccounts } from '@/types/linked-accounts.type'
import { ProfileType } from '@/types/profile.type'

const initialState: IAuthInitialState = {
	user: undefined,
	accessToken: '',
	isLoading: false
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		updateToken: (state, { payload }) => {
			state.accessToken = payload.accessToken
		},
		activateProfile: (state) => {
			if (state.user) {
				state.user.isVerified = true
			}
		},
		subscribeItem: (state, action: PayloadAction<string>) => {
			state?.user?.subscriptions?.push({ shopItemId: action.payload } as Subscription)
		},
		unSubscribeItem: (state, action: PayloadAction<string>) => {
			state.user!.subscriptions = state.user!.subscriptions!.filter(i => i.shopItemId !== action.payload)
		},
		updateProfileData: (state, action: PayloadAction<ProfileType>) => {
			state.user!.profile!.avatar = action.payload.avatar
			state.user!.profile!.fullName = action.payload.fullName
			state.user!.profile!.country = action.payload.country
		},
		updateSNData: (state, action: PayloadAction<LinkedAccounts>) => {
			state.user!.profile!.socialNetworks = action.payload
		},
		logOut: state => {
			state.user = undefined
			state.accessToken = ''
		}
	},
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
				state.accessToken = payload.accessToken
			})
			.addCase(register.rejected, state => {
				state.isLoading = false
				state.user = undefined
				state.accessToken = ''
			})
			.addCase(login.pending, state => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
				state.accessToken = payload.accessToken
			})
			.addCase(login.rejected, state => {
				state.isLoading = false
				state.user = undefined
				state.accessToken = ''
			})
			.addCase(logout.pending, state => {
				state.isLoading = false
				state.user = undefined
				state.accessToken = ''
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = undefined
				state.accessToken = ''
			})
			.addCase(logout.rejected, state => {
				state.isLoading = false
				state.user = undefined
				state.accessToken = ''
			})
	}
})

export const {
	updateToken, logOut, activateProfile,
	subscribeItem, unSubscribeItem,
	updateSNData, updateProfileData
} = authSlice.actions
