import axios from 'axios'

export const fetcher = async (url: string) =>
	await axios
		.get(url, { headers: { authorization: '0e10a7c8-de62b507-fb57e503-d359a4a2' } })
		.then(res => res.data)
		.catch(res => console.log(res))

export const defaultFetcher = async (url: string) =>
	await axios
		.get(url)
		.then(res => res.data)
		.catch(res => console.log(res))

export const patchFetcher = async (url: string) =>
	await axios
		.patch(url)
