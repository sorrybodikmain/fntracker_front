
export const getContentType = () => ({
	'Content-Type': 'application/json'
})

export function parseDates(dates: string[]) {
	const filterDates = dates
		.filter(i => new Date(i).getMonth() === (new Date().getMonth() + 1)
			|| new Date(i).getMonth() === new Date().getMonth()
		).sort()
	const minDate = new Date(filterDates[0]).getDate()
	const maxDate = new Date(filterDates[filterDates.length - 1]).getDate()
	return { maxDate, minDate }
}

export function fixImageWidth(url: string, width = 480) {
	const url1 = new URL(url)
	const search_params = url1.searchParams
	search_params.set('width', width.toString())
	url1.search = search_params.toString()
	return url1.toString()
}