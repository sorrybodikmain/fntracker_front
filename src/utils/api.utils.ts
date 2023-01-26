
export const getContentType = () => ({
	'Content-Type': 'application/json'
})

export const parseDates = (dates: string[]) => {
	const filterDates = dates
		.filter(i => new Date(i).getMonth() === (new Date().getMonth() + 1)
			|| new Date(i).getMonth() === new Date().getMonth()
		).sort()
	const minDate = new Date(filterDates[0]).getDate()
	const maxDate = new Date(filterDates[filterDates.length - 1]).getDate()
	return { maxDate, minDate }
}
