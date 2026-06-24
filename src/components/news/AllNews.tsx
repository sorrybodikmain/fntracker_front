import type { BRNews } from '@/types/fnapi'
import { Novelty } from './Novelty'

interface AllNewsProps {
	news: BRNews
	title: string
}

export function AllNews({ news, title }: AllNewsProps) {
	const items = [
		...(news.motds ?? []).map(motd => ({ item: motd, date: news.date })),
		...(news.messages ?? []).map(message => ({
			item: message,
			date: news.date
		}))
	]

	return (
		<section id='news'>
			<div className=':uno: bg-gray-900 p-6 text-white'>
				<div className=':uno: container mx-auto'>
					<h1 className=':uno: text-md border-l-4 border-primary pl-2'>
						{title.toUpperCase()}
					</h1>
					<div className=':uno: grid grid-cols-1 space-y-4 mt-4'>
						{items.slice(0, 6).map((entry, index) => (
							<Novelty key={index} item={entry.item} date={entry.date} />
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
