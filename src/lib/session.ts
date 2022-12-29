import type { IronSessionOptions } from 'iron-session'
import type { User } from '@/api/types/user.type'

export const sessionOptions: IronSessionOptions = {
	password: process.env.SECRET_COOKIE_PASSWORD as string,
	cookieName: 'fntracker-session',

	cookieOptions: {
		secure: false
	},
}

declare module 'iron-session' {
	interface IronSessionData {
		user?: User
	}
}
