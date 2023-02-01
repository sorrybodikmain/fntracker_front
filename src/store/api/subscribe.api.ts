import { api } from '@/store/api/api'
import { Subscription } from '@/types/subscription.type'

export const subscribeApi = api.injectEndpoints({
	endpoints: builder => ({
		getAllSubscriptions: builder.query<Subscription[], void>({
			query: () => '/subscription/all'
		}),
		itemSubscribe: builder.mutation<void, string>({
			query: (id: string) => ({
				url: `/subscription/add/${id}`,
				method: 'POST'
			})
		}),
		itemUnsubscribe: builder.mutation<void, string>({
			query: (id: string) => ({
				url: `/subscription/remove/${id}`,
				method: 'DELETE'
			})
		})
	})
})

export const {
	useItemSubscribeMutation,
	useItemUnsubscribeMutation,
	useLazyGetAllSubscriptionsQuery
} = subscribeApi