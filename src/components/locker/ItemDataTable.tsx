import { getTranslations } from 'next-intl/server'
import type { BRCosmetic } from '@/types/fnapi'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'

interface ItemDataTableProps {
	cosmetic: BRCosmetic
}

export async function ItemDataTable({ cosmetic }: ItemDataTableProps) {
	const t = await getTranslations('locker')
	const history = [...(cosmetic.shopHistory ?? [])].reverse()

	if (history.length === 0) return null

	return (
		<div className=':uno: mt-8'>
			<SectionHeading>{t('table_title')}</SectionHeading>
			<Card className=':uno: overflow-hidden'>
				<table className=':uno: w-full text-sm'>
					<thead>
						<tr className=':uno: border-b border-white/10 bg-primary/10'>
							<th
								scope='col'
								className=':uno: py-3 px-6 text-left text-xs uppercase tracking-wider text-primary font-display'
							>
								{t('table_date')}
							</th>
						</tr>
					</thead>
					<tbody>
						{history.map((date, index) => (
							<tr
								key={index}
								className=':uno: border-b border-white/5 hover:bg-white/5 transition'
							>
								<td className=':uno: py-3 px-6 text-foreground'>
									{new Date(date).toLocaleDateString()}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</Card>
		</div>
	)
}
