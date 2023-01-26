import { combineReducers } from 'redux'

import { api } from '@/store/api/api'
import { authSlice } from '@/store/auth/auth.slice'

export const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer,
	auth: authSlice.reducer,
})
