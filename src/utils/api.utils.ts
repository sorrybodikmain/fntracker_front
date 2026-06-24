export function fixImageWidth(url: string, width = 480) {
	const url1 = new URL(url)
	url1.searchParams.set('width', width.toString())
	return url1.toString()
}

export const generatePathToMapImg = (id: string, poi: boolean, lang: string) =>
	fixImageWidth(
		`https://media.fortniteapi.io/images/maps${
			poi ? `/poi/${lang}` : ''
		}/map-${id}.png`,
		760
	)

export function validURL(str: string) {
	const pattern = new RegExp(
		'^(https?:\\/\\/)?' +
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
			'((\\d{1,3}\\.){3}\\d{1,3}))' +
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
			'(\\?[;&a-z\\d%_.~+=-]*)?' +
			'(\\#[-a-z\\d_]*)?$',
		'i'
	)
	return pattern.test(str)
}

export const getPercentByDates = (dates: {
	begin: string
	end: string
}): number => {
	const start = new Date(dates.begin)
	const end = new Date(dates.end)
	const now = new Date()
	return +(((+now - +start) / (+end - +start)) * 100).toFixed(2)
}

export const fillMassive = (from: number, to: number) => {
	const arr = Array(to)
	for (let i = from; i < to; i++) arr[i] = i
	return arr
}
