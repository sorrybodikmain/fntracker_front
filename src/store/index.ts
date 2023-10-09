import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { rootReducer } from './root.reducer'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	PURGE,
	REGISTER,
	REHYDRATE
} from 'redux-persist'


const reducer = persistReducer({
	key: 'root',
	storage
}, rootReducer)

export const store = configureStore({
	reducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
})

export type AppDispatch = typeof store.dispatch
export type TypeRootState = ReturnType<typeof rootReducer>
