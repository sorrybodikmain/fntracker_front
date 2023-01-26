import { IUser } from '@/types/user.type'

export interface IAuthData {
	user: IUser | undefined
	accessToken: ''
}
