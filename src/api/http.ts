import axios from 'axios'
import { getContentType } from '@/utils/api.utils'

export const API_URL = process.env.REACT_APP_API_URL

export const $http = axios.create({
	baseURL: API_URL,
	withCredentials: true,
	headers: getContentType()
})
