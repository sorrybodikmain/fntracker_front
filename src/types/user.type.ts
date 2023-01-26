import { Subscription } from './subscription.type'
import { BaseType } from './base.type'
import { ProfileType } from './profile.type'


export interface IUser extends BaseType {
	'email': string,
	'isVerified': boolean,
	'hashedRt': string
	'profile': ProfileType | null,
	'subscriptions': Subscription[] | null,
}


export interface IRefreshResponse {
	'accessToken': string
}
