import { BaseQueryFn, createApi, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

import { logOut, updateToken } from '@/store/auth/auth.slice'
import { TypeRootState } from '@/store/store'

import { API_URL } from '@/api/http'

const baseQuery = fetchBaseQuery({
	baseUrl: API_URL,
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as TypeRootState).auth.accessToken
		if (token) headers.set('Authorization', `Bearer ${token}`)
		return headers
	}
})

const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions)

	if (result.error && result.error.status === 401) {
		const refreshResult = await baseQuery(
			{ url: '/auth/refresh', method: 'POST' },
			api,
			extraOptions
		)
		if (refreshResult.data) {
			api.dispatch(updateToken(refreshResult.data))
			result = await baseQuery(args, api, extraOptions)
		} else
			api.dispatch(logOut())
	}
	return result
}

export const api = createApi({
	reducerPath: 'fntrackerAPI',
	tagTypes: ['Profile', 'Auth'],
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({})
})
