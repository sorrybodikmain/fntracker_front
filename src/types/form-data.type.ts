import { IUser } from '@/types/user.type'

export interface IAuthData {
	user: IUser | undefined
	accessToken: ''
}

export interface IRegisterData {
	email: string,
	password: string
	egsId: string
	country: string
}

