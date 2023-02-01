import { DIVISIONS } from '@/data/divisions'
import i18next from 'i18next'

export const getContentType = () => ({
	'Content-Type': 'application/json'
})

export function fixImageWidth(url: string, width = 480) {
	const url1 = new URL(url)
	const search_params = url1.searchParams
	search_params.set('width', width.toString())
	url1.search = search_params.toString()
	return url1.toString()
}


export function getRelativeTimeString(shopHistory: string[]) {
	const lastDate = shopHistory[shopHistory.length - 1]
	const formatter = new Intl.RelativeTimeFormat(i18next.language, {
		numeric: 'auto', style: 'long', localeMatcher: 'best fit'
	})
	let duration = (new Date(lastDate).getTime() - new Date().getTime()) / 1000
	for (let i = 0; i <= DIVISIONS.length; i++) {
		const division = DIVISIONS[i]
		if (Math.abs(duration) < division.amount) {
			return formatter.format(Math.round(duration), division.name)
		}
		duration /= division.amount
	}
	return
}