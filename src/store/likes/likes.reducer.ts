import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LikedState } from './likes.interface'

const initialState: LikedState = {
	items: []
}

const likesSlice = createSlice({
	name: 'likes',
	initialState,
	reducers: {
		addLike: (state, { payload }: PayloadAction<string>) => {
			if (!state.items.some(i => i === payload)) {
				state.items.push(payload)
			}
		},
		deleteLike: (state, { payload }: PayloadAction<string>) => {
			state.items = state.items.filter(i => i !== payload)
		},
		clearLikes: state => {
			state.items = []
		}
	}
})

export const likesActions = likesSlice.actions
export default likesSlice
