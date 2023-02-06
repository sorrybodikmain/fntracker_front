import type { Middleware } from '@reduxjs/toolkit'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const rtkQueryErrorLogger: Middleware =
	() => (next) => (action) => {
		if (isRejectedWithValue(action))
			toast.error(action.payload.data.message)
		return next(action)
	}