export interface Map {
	patchVersion: string
	releaseDate: string
	url: string
	urlPOI: string
}

export interface MapsResponse {
	result: boolean
	lang: string
	maps: Map[]
}
