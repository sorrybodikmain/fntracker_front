import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LikesStore {
	items: string[]
	toggleLike: (id: string) => boolean
}

export const useLikesStore = create<LikesStore>()(
	persist(
		(set, get) => ({
			items: [],
			toggleLike: (id: string) => {
				const has = get().items.includes(id)
				set({
					items: has
						? get().items.filter(i => i !== id)
						: [...get().items, id]
				})
				return !has
			}
		}),
		{ name: 'fntracker-likes' }
	)
)
