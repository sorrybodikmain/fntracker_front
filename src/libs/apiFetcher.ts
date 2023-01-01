import axios from 'axios'

export const fetcher = async (url: string) =>
	await axios
		.get(url, { headers: { authorization: process.env.REACT_APP_API_TOKEN } })
		.then(res => res.data)
		.catch(res => console.log(res))