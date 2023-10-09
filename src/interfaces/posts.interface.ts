export interface INovelty {
	id: string
	title: string
	tabTitle: string
	date: string
	body: string
	adspace: string
	image: string
	live: boolean
	video: any
}

export interface INewsResponse {
	result: boolean
	type: string
	lang: string
	show: number
	news: INovelty[]
}
