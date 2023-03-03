import i18next from 'i18next'
import { BPSeasonDates } from '@/types/battle-pass.types'

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

export const generatePathToMapImg = (id: string, poi: boolean) =>
	fixImageWidth(`https://media.fortniteapi.io/images/maps${
		poi ? `/poi/${i18next.language}` : ''}/map-${id}.png`, 760)


export function validURL(str: string) {
	const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
		'(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
	return !!pattern.test(str)
}
export const generateLockerSiteMap = (mas =
																				['432423', '432432423', '432423']
) => {
	const siteUrl = 'https://fntracker.pp.ua/locker/'
	const getBaseLink = (loc: string) =>
		`<url>
		<lastmod>${new Date().toLocaleDateString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
		<loc>${loc}</loc>
		</url>`
	console.log(JSON.stringify(mas.map(value => getBaseLink(siteUrl + value))))
}

export const getPercentByDates = (dates: BPSeasonDates) => {
	const start = new Date(dates.begin),
		end = new Date(dates.end),
		now = new Date()
	return (((+now - +start) / (+end - +start)) * 100).toFixed(3)
}
export const fillMassive = (from: number, to: number) => {
	const arr = Array(to)
	for (let i = from; i < to; i++) arr[i] = i
	return arr
}
