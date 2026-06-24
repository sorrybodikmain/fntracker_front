import 'server-only'

const API_KEY = process.env.FORTNITE_API_KEY ?? '0e10a7c8-de62b507-fb57e503-d359a4a2'

async function fortniteFetch<T>(
	url: string,
	options?: { revalidate?: number; tags?: string[]; cache?: RequestCache }
): Promise<T> {
	const res = await fetch(url, {
		headers: { authorization: API_KEY },
		next: {
			revalidate: options?.revalidate,
			tags: options?.tags
		},
		cache: options?.cache
	})
	if (!res.ok) throw new Error(`Fortnite API error: ${res.status} ${url}`)
	return res.json() as Promise<T>
}

export function getShop(lang: string) {
	return fortniteFetch(`https://fortniteapi.io/v2/shop?lang=${lang}`, {
		revalidate: 300,
		tags: [`shop-${lang}`]
	})
}

export function getNews(lang: string) {
	return fortniteFetch(`https://fortniteapi.io/v1/news?lang=${lang}&type=br`, {
		revalidate: 600,
		tags: [`news-${lang}`]
	})
}

export function getItem(id: string, lang: string) {
	return fortniteFetch(
		`https://fortniteapi.io/v2/items/get?id=${id}&lang=${lang}`,
		{ revalidate: 3600, tags: [`item-${id}-${lang}`] }
	)
}

export function getItemsList(lang: string) {
	return fortniteFetch(`https://fortniteapi.io/v2/items/list?lang=${lang}`, {
		revalidate: 3600,
		tags: [`items-list-${lang}`]
	})
}

export function getUpcomingItems(lang: string) {
	return fortniteFetch(
		`https://fortniteapi.io/v2/items/upcoming?lang=${lang}`,
		{ revalidate: 3600, tags: [`upcoming-${lang}`] }
	)
}

export function getBattlePass(lang: string, season: string) {
	return fortniteFetch(
		`https://fortniteapi.io/v2/battlepass?lang=${lang}&season=${season}`,
		{ revalidate: 3600, tags: [`bp-${season}-${lang}`] }
	)
}

export function getMapsList() {
	return fortniteFetch('https://fortniteapi.io/v1/maps/list', {
		revalidate: 86400,
		tags: ['maps-list']
	})
}

export function lookupPlayer(username: string) {
	return fortniteFetch(
		`https://fortniteapi.io/v1/lookup?username=${encodeURIComponent(username)}`,
		{ cache: 'no-store' }
	)
}

export function lookupPlayers(username: string) {
	return fortniteFetch(
		`https://fortniteapi.io/v1/lookup?strict=false&limit=10&username=${encodeURIComponent(username)}`,
		{ cache: 'no-store' }
	)
}

export function getStats(accountId: string) {
	return fortniteFetch(
		`https://fortniteapi.io/v1/stats?account=${accountId}`,
		{ cache: 'no-store' }
	)
}
