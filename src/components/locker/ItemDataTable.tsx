import { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { ShopItemResponse } from '@/types/shop.type'

interface IItemDataTableProps {
	data: ShopItemResponse
}

const ItemDataTable: FC<PropsWithChildren<IItemDataTableProps>> = ({ data }) => {
	const { t } = useTranslation('locker')
	return (
		<div className='mb-4'>
			<h1 className='border-l-4 border-primary pl-2 my-4'>
				{t('table_title').toUpperCase()}
			</h1>
			<div className='flex flex-wrap bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition'>
				<table className='w-full text-sm text-left'>
					<thead className='text-xs uppercase text-gray-300'>
					<tr>
						<th scope='col' className='py-3 px-6'>
							{t('table_date')}
						</th>
						<th scope='col' className='py-3 px-6'>
							{t('table_price')}
						</th>
					</tr>
					</thead>
					<tbody>
					{data?.item.shopHistory
						.reverse()
						.map((item, index) => (
							<tr key={index} className='text-white'>
								<td className='py-4 px-6'>{new Date(item).toLocaleDateString()}</td>
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
