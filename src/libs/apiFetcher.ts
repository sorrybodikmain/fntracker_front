import axios from 'axios'

export const fetcher = async (url: string) =>
	await axios
		.get(url, { headers: { authorization: process.env.REACT_APP_API_TOKEN } })
		.then(res => res.data)
		.catch(res => console.log(res))

export const pr_fetcher = async (url: string) =>
	await axios
		.get(url)
		.then(res => res.data)
		.catch(res => console.log(res))

export const patch_fetcher = async (url: string) =>
	await axios
		.patch(url)
