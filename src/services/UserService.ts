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
			twitter: instagram,
			instagram: twitter,
			telegram: telegram
		})
	}
}