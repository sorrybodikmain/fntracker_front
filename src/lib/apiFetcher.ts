import axios from 'axios'
export  const  fetcher = (url: string) =>
axios
	.get(url, { headers: { authorization: process.env.API_TOKEN } })
	.then(res => res.data)
	.catch(res => console.log(res))