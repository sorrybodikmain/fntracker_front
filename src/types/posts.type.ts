export interface IOnePost {
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

export interface IPostsResponse {
	result: boolean
	type: string
	lang: string
	show: number
	news: IOnePost[]
}