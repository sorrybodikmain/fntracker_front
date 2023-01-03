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
type ItemPrice = {
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
type SectionImages = {
	displayAsset: string
	materialInstance: string
	url: string
	background: string
	full_background: string
}
export type ShopItemResponse = {
	result: boolean
	item: {
		id: string
		type: ItemType
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
		images: {
			icon: string
			featured: string
			background: string
			icon_background: string
			full_background: string
		}
	}
}
export type ItemShop = {
	mainId: string
	displayName: string
	displayDescription: string
	displayType: string
	mainType: string
	displayAssets: [SectionImages]
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
export type ShopTodayResponse = {
	result: boolean
	fullShop: boolean
	currentRotation: any
	lastUpdate: ShopLastUpdate
	shop: ItemShop[]
}
