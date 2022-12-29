import axios from 'axios'

export const API_URL = process.env.API_URL

export const $axios = axios.create({
	baseURL: API_URL,
	withCredentials: true,
	headers: {
		'content-type': 'application/json'
	}
})
