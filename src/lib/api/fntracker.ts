import 'server-only'

const BASE_URL =
	process.env.FNTRACKER_API_URL ?? 'https://api.fntracker.pp.ua'

async function fntrackerFetch<T>(
	path: string,
	options?: { revalidate?: number; method?: string; cache?: RequestCache }
): Promise<T> {
	const res = await fetch(`${BASE_URL}${path}`, {
		method: options?.method ?? 'GET',
		next: { revalidate: options?.revalidate },
		cache: options?.cache
	})
	if (!res.ok) throw new Error(`FNTracker API error: ${res.status} ${path}`)
	return res.json() as Promise<T>
}

export function getPr(nickname: string) {
	return fntrackerFetch(
		`/pr?platform=PC&region=EU&egsName=${encodeURIComponent(nickname)}`,
		{ revalidate: 60 }
	)
}

export function getProfile(accountId: string) {
	return fntrackerFetch(`/profile/${accountId}`, { revalidate: 60 })
}

export async function incrementProfileViews(accountId: string) {
	await fetch(`${BASE_URL}/profile/${accountId}/increment`, {
		method: 'PATCH'
	})
}
