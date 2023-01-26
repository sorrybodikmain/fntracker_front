import { BaseType } from './base.type'

export type LinkedAccounts = {
	youtube: string | null
	twitch: string | null
	instagram: string | null
	twitter: string | null
	telegram: string | null
} & BaseType