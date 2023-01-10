import { IUser } from '@/api/types/user.type'
import { makeAutoObservable } from 'mobx'
import AuthService from '../services/AuthService'
import UserService from '../services/UserService'
import { Subscription } from '@/api/types/subscription.type'
import { LinkedAccounts } from '@/api/types/linked-accounts.type'
import { ProfileType } from '@/api/types/profile.type'

export default class Store {
	user = {} as IUser
	isAuth = false

	constructor() {
		makeAutoObservable(this)
	}

	setAuth(bool: boolean) {
		this.isAuth = bool
	}

	setUser(user: IUser) {
		this.user = user
	}

	setSubs(subs: Subscription[]) {
		this.user.subscriptions = subs
	}

	setSocialNetworks(socNetworks: LinkedAccounts) {
		this.user.profile!.socialNetworks = socNetworks
	}

	setProfile(profileData: ProfileType) {
		this.user.profile = profileData
	}

	async login(email: string, password: string) {
		try {
			const res = await AuthService.login(email, password)
			localStorage.setItem('token', res.data.accessToken)
			this.setAuth(true)
			this.setUser(res.data.user)
		} catch (e: any) {
			console.log(e)
		}
	}

	async registration(email: string, password: string, egsId: string, country: string) {
		try {
			await AuthService.registration(email, password, egsId, country)
		} catch (e: any) {
			console.log(e)
		}
	}

	async checkAuth() {
		try {
			const res = await AuthService.refreshToken(this.user.hashedRt)
			localStorage.setItem('token', res.data.accessToken)
			this.setAuth(true)
		} catch (e: any) {
			console.log(e)
		}
	}

	async updateSubscriptions() {
		try {
			const res = await UserService.getAllSubscriptions()
			this.setSubs(res.data)
		} catch (e: any) {
			console.log(e)
		}
	}


	async updateSocialNetworks(
		youtube: string,
		twitch: string,
		instagram: string,
		twitter: string,
		telegram: string) {
		try {
			this.setSocialNetworks({
				telegram: telegram,
				twitch: twitch,
				twitter: twitter,
				instagram: instagram
			} as LinkedAccounts)
			await UserService.updateSocialsNetworks(
				youtube,
				twitch,
				instagram,
				twitter,
				telegram)
		} catch (e: any) {
			console.log(e)
		}
	}

	async updateProfile(
		country: string,
		avatar: string,
		fullName: string
	) {
		try {
			this.setProfile({
				country: country,
				avatar: avatar,
				fullName: fullName
			} as ProfileType)
			await UserService.updateProfile(country, avatar, fullName)
		} catch (e: any) {
			console.log(e)
		}
	}

	async subscribe(itemId: string) {
		try {
			await UserService.subscribe(itemId)
			await this.updateSubscriptions()
		} catch (e: any) {
			console.log(e)
		}
	}

	async unsubscribe(itemId: string) {
		try {
			await UserService.unsubscribe(itemId)
			await this.updateSubscriptions()
		} catch (e: any) {
			console.log(e)
		}
	}

	async logout() {
		try {
			await AuthService.logout()
			localStorage.removeItem('token')
			this.setAuth(false)
			this.setUser({} as IUser)
		} catch (e) {
			console.log(e)
		}
	}

}