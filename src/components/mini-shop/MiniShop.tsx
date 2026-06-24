import Link from 'next/link'
import type { ItemShop } from '@/interfaces'
import { MiniItem } from './MiniItem'

interface MiniShopProps {
	shop: ItemShop[]
	title: string
	shopLinkLabel: string
}

export function MiniShop({ shop, title, shopLinkLabel }: MiniShopProps) {
	const dailyItems = shop.filter(item => item.section.id === 'Daily')

	return (
		<section id='mini-shop'>
			<div className=':uno: p-6 text-white w-full lg:w-96'>
				<h1 className=':uno: border-l-4 border-primary pl-2'>
					{title.toUpperCase()}
				</h1>
				<div className=':uno: mt-4 grid-cols-2 grid-rows-3 gap-3 sm:gap-5 grid lg:grid-cols-2 lg:grid-rows-3 md:grid-rows-2 sm:grid-rows-2 sm:grid-cols-3'>
					{dailyItems.map((item, index) => (
						<MiniItem key={index} data={item} />
					))}
				</div>
				<Link
					href='/shop'
					className=':uno: block text-center mt-4 rounded-lg p-1 bg-gray-600 hover:scale-[1.03]'
				>
					<span className=':uno: text-md w-full cursor-pointer'>
						{shopLinkLabel}
					</span>
				</Link>
			</div>
		</section>
	)
}
