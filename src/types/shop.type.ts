type ShopLastUpdate = {
	date: string
	uid: string
}
type ItemRarity = {
	id: string
	name: string
}
type ItemType = {
	id: string
	name: string
}
type ItemImages = {
	icon: string
	featured: string
	background: string
	icon_background: string
	full_background: string
}
export type ItemPrice = {
	regularPrice: number
	finalPrice: number
}
type GrantedItem = {
	id: string
	type: ItemType
	name: string
	description: string
	rarity: ItemRarity
	images: ItemImages
}
export type SectionImages = {
	displayAsset: string;
	materialInstance: string;
	url: string;
	flipbook?: any;
	background_texture?: any;
	background: string;
	full_background: string;
}


export interface IUpcomingItemsResponse {
	result: boolean;
	lastUpdate: ShopLastUpdate
	items: ItemShop[]
}

interface IItemIntroduction {
	chapter: string;
	season: string;
	text: string;
}
export type ShopItemResponse = {
	result: boolean
	item: {
		id: string
		type: ItemType
		displayName: string
		name: string
		description: string
		rarity: ItemRarity
		price: number
		added: {
			date: string
			version: string
		}
		upcoming: boolean
		reactive: boolean
		releaseDate: string
		lastAppearance: string
		introduction: IItemIntroduction;
		interest: number
		displayAssets: [SectionImages]
		shopHistory: string[]
		battlepass: {
			season: number
			tier: number
			page: number
			type: string
			displayText: {
				chapter: string
				season: string
				chapterSeason: string
			}
			battlePassName: string
		}
		images: ItemImages
	}
}
export type ItemShop = {
	id: string
	mainId: string
	displayName: string
	displayDescription: string
	displayType: string
	mainType: string
	name: string
	images: ItemImages
	displayAssets: SectionImages[]
	firstReleaseDate: string
	previousReleaseDate: string
	giftAllowed: boolean
	buyAllowed: boolean
	price: ItemPrice
	rarity: ItemRarity
	granted: GrantedItem[]
	priority: number
	section: {
		id: string
		name: string
		landingPriority: number
	}
	groupIndex: number
	storeName: string
	tileSize: string
}
export type AllItemsResponse = {
	status: number
	pages: number
	items: ItemShop[]
}
export type ShopTodayResponse = {
	result: boolean
	fullShop: boolean
	currentRotation: any
	nextRotation: any
	lastUpdate: ShopLastUpdate
	shop: ItemShop[]
}
