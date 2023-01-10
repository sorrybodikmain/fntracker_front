import { AxiosResponse } from 'axios'
import httpClient from '../http'
import { Subscription } from '@/api/types/subscription.type'

export default class UserService {
	static async subscribe(shopItemId: string): Promise<AxiosResponse<string>> {
		return httpClient.post<string>(`/subscription/add/${shopItemId}`)
	}

	static async unsubscribe(shopItemId: string): Promise<AxiosResponse<string>> {
		return httpClient.delete<string>(`/subscription/remove/${shopItemId}`)
	}

	static async getAllSubscriptions(): Promise<AxiosResponse<Subscription[]>> {
		return httpClient.get<Subscription[]>(`/subscription/all`)
	}

	static async activateAccount(searchParams: string
	): Promise<AxiosResponse<string>> {
		return httpClient.get(`/user/activate${searchParams}`)
	}

	static async updateSocialsNetworks(
		youtube: string,
		twitch: string,
		instagram: string,
		twitter: string,
		telegram: string
	): Promise<AxiosResponse<string>> {
		return httpClient.patch<string>('/profile/sn', {
			youtube: youtube,
			twitch: twitch,
			twitter: twitter,
			instagram: instagram,
			telegram: telegram
		})
	}

	static async updateProfile(
		country: string,
		avatar: string,
		fullName: string
	): Promise<AxiosResponse<string>> {
		return httpClient.patch('/profile', {
			country: country,
			gradient: 'from-purple-800 to-cyan-700',
			avatar: avatar,
			fullName: fullName
		})
	}
}