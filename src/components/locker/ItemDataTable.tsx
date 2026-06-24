import { getTranslations } from 'next-intl/server'
import type { BRCosmetic } from '@/types/fnapi'

interface ItemDataTableProps {
	cosmetic: BRCosmetic
}

export async function ItemDataTable({ cosmetic }: ItemDataTableProps) {
	const t = await getTranslations('locker')
	const history = [...(cosmetic.shopHistory ?? [])].reverse()

	if (history.length === 0) return null

	return (
		<div className=':uno: mb-4'>
			<h1 className=':uno: border-l-4 border-primary pl-2 my-4'>
				{t('table_title').toUpperCase()}
			</h1>
			<div className=':uno: flex flex-wrap bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition'>
				<table className=':uno: w-full text-sm text-left'>
					<thead className=':uno: text-xs uppercase text-gray-300'>
						<tr>
							<th scope='col' className=':uno: py-3 px-6'>
								{t('table_date')}
							</th>
						</tr>
					</thead>
					<tbody>
						{history.map((date, index) => (
							<tr key={index} className=':uno: text-white'>
								<td className=':uno: py-4 px-6'>
									{new Date(date).toLocaleDateString()}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
