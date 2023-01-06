import { IUser } from '@/api/types/user.type'
import { makeAutoObservable } from 'mobx'
import AuthService from '../services/AuthService'

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

	async login(email: string, password: string) {
		try {
			const res = await AuthService.login(email, password)
			localStorage.setItem('token', res.data.accessToken)
			this.setAuth(true)
			this.setUser(res.data.user)
		} catch (e: any) {
			console.log(e.data.message)
		}
	}

	async registration(email: string, password: string, egsId: string, country: string) {
		try {
			const res = await AuthService.registration(email, password, egsId, country)
			localStorage.setItem('token', res.data.accessToken)
			this.setAuth(true)
			this.setUser(res.data.user)
		} catch (e: any) {
			console.log(e.data.message)
		}
	}

	async checkAuth() {
		try {
			const res = await AuthService.refreshToken(this.user.hashedRt)
			localStorage.setItem('token', res.data.accessToken)
			this.setAuth(true)
		} catch (e: any) {
			console.log(e.data.message)
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