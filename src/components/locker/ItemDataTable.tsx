import { FC, PropsWithChildren } from 'react'
import { ShopItemDetail } from '@/api/types/shop.type'

const ItemDataTable: FC<PropsWithChildren<{ data: ShopItemDetail }>> = ({ data }) => {

	return (<div className='mb-4'>
			<h2 className='border-l-4 border-primary pl-2 my-4'>
				{'Last times in the store'.toUpperCase()}
			</h2>
			<div className='flex flex-wrap bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition'>
				<table className='w-full text-sm text-left'>
					<thead className='text-xs uppercase text-gray-300'>
					<tr>
						<th scope='col' className='py-3 px-6'>
							Date
						</th>
						<th scope='col' className='py-3 px-6'>
							Price
						</th>
					</tr>
					</thead>
					<tbody>
					{data?.item.shopHistory.map((item, index) => (
						<tr key={index} className='text-white'>
							<td className='py-4 px-6'>{item}</td>
							<td className='py-4 px-6'>{data?.item.price}</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ItemDataTable
