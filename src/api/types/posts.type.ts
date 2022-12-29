export type OnePost = {
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
export type Posts = {
	result: boolean
	type: string
	lang: string
	show: number
	news: OnePost[]
}