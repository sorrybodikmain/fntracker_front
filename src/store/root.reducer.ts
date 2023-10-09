import likesSlice from './likes/likes.reducer'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
	likes: likesSlice.reducer
})
