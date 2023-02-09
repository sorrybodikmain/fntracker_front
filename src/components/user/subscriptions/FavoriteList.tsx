import { FC, useEffect, useState } from 'react'
import FavoriteItem from './FavoriteItem'
import { useTranslation } from 'react-i18next'
import { Subscription } from '@/types/subscription.type'
import { useLazyGetAllSubscriptionsQuery } from '@/store/api/subscribe.api'
import { unSubscribeItem } from '@/store/auth/auth.slice'
import { useAppDispatch } from '@/hooks/useTypedSelector'
import Preloader from '@/components/preloaders/Preloader'

const FavoriteList: FC = () => {
	const { t } = useTranslation('user-profile')
	const [data, setData] = useState<Subscription[]>()
	const [getItems, { data: items, isSuccess }] = useLazyGetAllSubscriptionsQuery()
	const dispatch = useAppDispatch()

	useEffect(() => {
		(async () => await getItems())()
		if (isSuccess)
			setData(items)
	}, [items])

	const deleteItem = (itemId: string) => {
		dispatch(unSubscribeItem(itemId))
		setData(data?.filter(i => i.shopItemId !== itemId))
	}

	return (
		<section id='mini-shop'>
			<div className='p-6 text-white w-full min-h-screen mx-auto container'>
				<h2 className='border-l-4 border-primary text-lg pl-2'>{t('favorite_title')}</h2>
				{data ?
					<div
						className='mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-5 xl:rid-cols-6 lg:gap-6'>
						{data &&
							data.map((item, index) => (
								<FavoriteItem key={index} subscription={item} deleteItem={deleteItem} />
							))
						}
					</div> :
					<Preloader />
				}


			</div>
		</section>
	)
}

export default FavoriteList
