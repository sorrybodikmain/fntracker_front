import type { BRNews } from '@/types/fnapi'
import { Novelty } from './Novelty'
import { SectionHeading } from '@/components/ui/SectionHeading'

interface AllNewsProps {
	news: BRNews
	title?: string
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
			{title ? <SectionHeading>{title}</SectionHeading> : null}
			<div className=':uno: grid grid-cols-1 gap-4'>
				{items.slice(0, 6).map((entry, index) => (
					<Novelty key={index} item={entry.item} date={entry.date} />
				))}
			</div>
		</section>
	)
}
