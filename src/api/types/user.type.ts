import { Subscription } from '@/api/types/subscription.type'
import { BaseType } from '@/api/types/base.type'
import { ProfileType } from '@/api/types/profile.type'


export interface IUser extends BaseType {
	'email': string,
	'isVerified': boolean,
	'hashedRt': string
	'profile': ProfileType | null,
	'subscriptions': Subscription[] | null,
}

export type LoginResponse = {
	'user': IUser,
	'accessToken': string
}

export interface IRefreshResponse {
	'accessToken': string
}
