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

export const generatePathToMapImg = (id: string, poi: boolean) =>
	fixImageWidth(`https://media.fortniteapi.io/images/maps${
		poi ? `/poi/${i18next.language}` : ''}/map-${id}.png`, 800)


export const generateLockerSiteMap = (mas =
																	['432423', '432432423', '432423']
) => {
	const siteUrl = 'https://fntracker.pp.ua/locker/'
	const getBaseLink = (loc: string) => `<url><loc>${loc}</loc></url>`
	const getBaseLayout = () =>
		`<?xml version="1.0" encoding="UTF-8"?> 
			<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"> 
			${JSON.stringify(mas.map(value => getBaseLink(siteUrl + value)))
		}
			</urlset>`
	console.log(getBaseLayout())
}

