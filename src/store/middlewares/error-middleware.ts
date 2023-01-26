import { isRejectedWithValue } from '@reduxjs/toolkit'
import { Middleware } from 'redux'
import { toast } from 'react-toastify'


export const rtkQueryErrorLogger: Middleware =
	() => next => action => {
		if (isRejectedWithValue(action)) {
			toast.error(action.error, action.errors)
		}

		return next(action)
	}
