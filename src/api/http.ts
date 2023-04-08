import axios from 'axios'
import { getContentType } from '@/utils/api.utils'

export const API_URL = 'https://api.fntracker.pp.ua/'

export const $http = axios.create({
	baseURL: API_URL,
	withCredentials: true,
	headers: getContentType()
})
