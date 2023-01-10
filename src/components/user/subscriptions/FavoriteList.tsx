import { FC, useEffect, useState } from 'react'
import FavoriteItem from './FavoriteItem'
import UserService from '@/services/UserService'
import { Subscription } from '@/api/types/subscription.type'
import { useTranslation } from 'react-i18next'

const FavoriteList: FC = () => {
	const { t } = useTranslation('user-profile')
	const [data, setData] = useState<Subscription[]>()
	useEffect(() => {
		UserService.getAllSubscriptions().then(res => setData(res.data))
	}, [])

	const deleteItem = (itemId: string) => {
		setData(data?.filter(i => i.shopItemId !== itemId))
	}

	return (
		<section id='mini-shop'>
			<div className='p-6 text-white w-full min-h-[81.1vh] mx-auto container'>
				<h2 className='border-l-4 border-primary text-lg pl-2'>{t('favorite_title')}</h2>
				<div
					className='mt-6 grid grid-cols-3 gap-4 lg:grid-cols-5 xl:rid-cols-6 lg:gap-6'>
					{data ?
						data.map((item, index) => (
							<FavoriteItem key={index} subscription={item} deleteItem={deleteItem} />
						))
						: null
					}
				</div>
			</div>
		</section>
	)
}

export default FavoriteList
