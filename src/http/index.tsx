import axios from 'axios'

export const API_URL = 'https://api.fntracker.pp.ua/'

const httpClient = axios.create({
	withCredentials: true,
	baseURL: API_URL
})

httpClient.interceptors.request.use((config: any) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})
export default httpClient