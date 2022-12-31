import { BaseType } from '@/api/types/base.type'


export type LinkedAccounts = {
	youtube: string | null
	twitch: string | null
	instagram: string | null
	twitter: string | null
	userId: number
} & BaseType