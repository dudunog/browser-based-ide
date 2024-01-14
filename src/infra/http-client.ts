import { DENO_ACCESS_TOKEN, DENO_API_URL } from '@/constants'
import axios from 'axios'

export const httpClient = axios.create({
	baseURL: DENO_API_URL,
	headers: {
		Authorization: `Bearer ${DENO_ACCESS_TOKEN}`,
		'Content-Type': 'application/json',
	},
})
