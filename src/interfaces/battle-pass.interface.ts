import { ItemPrice, ItemShop } from './shop.interface'

export interface DisplayInfo {
	chapter: string
	season: string
	chapterSeason: string
	battlepassName: string
}

export interface BPSeasonDates {
	begin: Date
	end: Date
}

export interface BPVideo {
	lang: string
	type: string
	url: string
}

export interface BPReward {
	tier: number
	page: number
	battlepass: string
	quantity: number
	price: ItemPrice
	item: ItemShop
}

export interface IBattlePassResponse {
	result: boolean
	season: number
	displayInfo: DisplayInfo
	seasonDates: BPSeasonDates
	videos: BPVideo[]
	rewards: BPReward[]
}
