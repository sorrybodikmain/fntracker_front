import { LinkedAccounts } from './linked-accounts.type'
import { Subscription } from './subscription.type'
import { BaseType } from '@/api/types/base.type'

export type User = {
	email: string,
	egsName: string | null,
	linkedAccounts: LinkedAccounts | null,
	subscriptions: Subscription[]
	isLoggedIn: boolean
} & BaseType