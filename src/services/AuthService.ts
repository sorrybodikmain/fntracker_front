import httpClient, { API_URL } from '../http'
import { AxiosResponse } from 'axios'
import { IRefreshResponse, LoginResponse } from '@/api/types/user.type'

export default class AuthService {
	static async login(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
		return httpClient.post<LoginResponse>('/auth/login', { email: email, password: password })
	}

	static async registration(email: string, password: string, egsId: string, country: string): Promise<AxiosResponse<LoginResponse>> {
		return httpClient.post<LoginResponse>('/auth/register', {
			email: email,
			password: password,
			egsId: egsId,
			country: country
		})
	}

	static async refreshToken(token: string): Promise<AxiosResponse<IRefreshResponse>> {
		return httpClient.post<IRefreshResponse>(`/auth/refresh`, {
			hashedRt: token
		})
	}

	static async logout(): Promise<void> {
		return httpClient.post('/auth/logout')
	}


}