import { $http } from '@/api/http'
import { IAuthData } from '@/types/form-data.type'

export const AuthService = {
	async login(email: string, password: string) {
		const response = await $http.post<IAuthData>('/auth/login', {
			email,
			password
		})
		return response.data
	},

	async register(
		email: string,
		password: string,
		egsId: string,
		country: string
	) {
		const response = await $http.post<IAuthData>('/auth/register', {
			egsId,
			country,
			email,
			password
		})
		return response.data
	},

	async logout(accessToken: string) {
		const response = await $http.post(
			'/auth/logout',
			{},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		)
		return response.data
	}
}
