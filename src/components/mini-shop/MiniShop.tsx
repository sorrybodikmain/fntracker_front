import Link from 'next/link'
import type { ShopEntry } from '@/types/fnapi'
import { getMiniShopEntries } from '@/utils/cosmetic'
import { MiniItem } from './MiniItem'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { GlassPanel } from '@/components/ui/GlassPanel'

interface MiniShopProps {
	entries: ShopEntry[]
	title: string
	shopLinkLabel: string
}

export function MiniShop({ entries, title, shopLinkLabel }: MiniShopProps) {
	const miniEntries = getMiniShopEntries(entries)

	return (
		<section id='mini-shop' className=':uno: w-full lg:w-96 p-4 md:p-6'>
			<GlassPanel className=':uno: p-5'>
				<SectionHeading className=':uno: mb-4'>{title}</SectionHeading>
				<div className=':uno: grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3'>
					{miniEntries.map((entry, index) => (
						<MiniItem key={`${entry.offerId}-${index}`} entry={entry} />
					))}
				</div>
				<div className=':uno: mt-5 text-center'>
					<Button href='/shop' variant='secondary' className=':uno: w-full'>
						{shopLinkLabel}
					</Button>
				</div>
			</GlassPanel>
		</section>
	)
}
