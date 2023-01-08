import { FC, useEffect, useState } from 'react'
import SubsItem from './SubsItem'
import UserService from '@/services/UserService'
import { Subscription } from '@/api/types/subscription.type'

const SubsItemList: FC = () => {
	const [data, setData] = useState<Subscription[]>()
	useEffect(() => {
		UserService.getAllSubscriptions().then(res => setData(res.data))
	}, [])
	
	const deleteItem = (itemId:string) => {
	  setData(data?.filter(i=> i.shopItemId !== itemId))
	}
	
	return (
		<section id='mini-shop'>
			<div className='p-6 text-white w-full min-h-screen'>
				<h2 className='border-l-4 border-primary text-lg pl-2'>Your Favorite</h2>
				<div
					className='mt-6 grid grid-cols-5 gap-3 sm:gap-6'>
					{data ?
						data.map((item, index) => (
							<SubsItem key={index} subscription={item} deleteItem={deleteItem} />
						))
						: null
					}
				</div>
			</div>
		</section>
	)
}

export default SubsItemList
