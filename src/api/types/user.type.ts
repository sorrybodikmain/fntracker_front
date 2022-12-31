import { LinkedAccounts } from '@/api/types/linked-accounts.type'
import { Subscription } from '@/api/types/subscription.type'
import { BaseType } from '@/api/types/base.type'


export type User = {
	email: string,
	egsName: string | null,
	linkedAccounts: LinkedAccounts | null,
	subscriptions: Subscription[]| null,
	isLoggedIn: boolean
} & BaseType