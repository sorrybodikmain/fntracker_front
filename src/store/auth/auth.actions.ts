import { createAsyncThunk } from '@reduxjs/toolkit'

import { AuthService } from '@/services/auth.service'
import { IAuthData } from '@/types/formData.type'

export const register = createAsyncThunk<IAuthData, any>(
	'auth/register',
	async ({ email, password, egsId, country }, thunkAPI) => {
		try {
			return await AuthService.register(email, password, egsId, country)
		} catch (e) {
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const login = createAsyncThunk<IAuthData, any>(
	'auth/login',
	async ({ email, password }, thunkAPI) => {
		try {
			return await AuthService.login(email, password)
		} catch (e) {
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const logout = createAsyncThunk<IAuthData, any>(
	'auth/logout',
	async ({ accessToken }, thunkAPI) => {
		try {
			return await AuthService.logout(accessToken)
		} catch (e) {
			return thunkAPI.rejectWithValue(e)
		}
	}
)
