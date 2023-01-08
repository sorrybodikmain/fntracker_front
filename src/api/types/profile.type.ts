import { BaseType } from '@/api/types/base.type'
import { LinkedAccounts } from '@/api/types/linked-accounts.type'

export type ProfileType = {
	egsId: string
	country: string
	avatar: string | null
	fullName: string | null,
	socialNetworks: LinkedAccounts | null
	gradient: string | null
} & BaseType
export type ProfileResponse = {
	viewsCount: number
	profile: ProfileType
}