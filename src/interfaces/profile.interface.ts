import { BaseInterface } from './base.interface'

export type ProfileInterface = {
	egsId: string
	country: string
	avatar: string | null
	fullName: string | null
	gradient: string | null
} & BaseInterface
export type ProfileResponse = {
	viewsCount: number
	profile: ProfileInterface | null
}
