export type PrResponse = {
	status: 200
	data: PrStats
}
export type PrStats = {
	region: string
	name: string
	platform: string
	points: number
	cashPrize: number
	events: number
	rank: number
	percentile: number
	countryCode: string
}

export type AccountIdResponse = {
	result: boolean
	account_id: string
}
type Matches = { value: string; platform: string }

type All_matches = {
	accountId: string
	matches: [Matches]
	matchType: string
	epicMutuals: number
	sortPosition: number
}

export type AccountIdStr = AccountIdResponse & {
	all_matches: All_matches[]
}
type AccountLevelHistory = {
	season: number
	level: number
	process_pct: number
}
export type BaseStats = {
	placetop1: number
	kd: number
	winrate: number
	placetop3: number
	placetop5: number
	placetop6: number
	placetop10: number
	placetop12: number
	placetop25: number
	kills: number
	matchesplayed: number
	minutesplayed: number
	score: number
	playersoutlived: number
	lastmodified: number
}
export type AccountStatsResponse = {
	result: boolean
	name: string
	accountLevelHistory: AccountLevelHistory[]
	global_stats: {
		solo: BaseStats
		duo: BaseStats
		trio: BaseStats
		squad: BaseStats
	}
	seasons_available: [number]
}
