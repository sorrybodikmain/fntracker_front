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
		subscribeItem: (state, action: PayloadAction<string>) => {
			state?.user?.subscriptions?.push({ shopItemId: action.payload } as Subscription)
		},
		unSubscribeItem: (state, action: PayloadAction<string>) => {
			state.user!.subscriptions = state.user!.subscriptions!.filter(i => i.shopItemId !== action.payload)
		},
		updateProfileData: (state, action: PayloadAction<ProfileType>) => {
			state.user!.profile = action.payload
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
				state.isLoading = true
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
	updateToken, logOut,
	subscribeItem, unSubscribeItem,
	updateSNData, updateProfileData
} = authSlice.actions
