import type { INovelty } from '@/interfaces'
import { Novelty } from './Novelty'

interface AllNewsProps {
	news: INovelty[]
	title: string
}

export function AllNews({ news, title }: AllNewsProps) {
	return (
		<section id='news'>
			<div className=':uno: bg-gray-900 p-6 text-white'>
				<div className=':uno: container mx-auto'>
					<h1 className=':uno: text-md border-l-4 border-primary pl-2'>
						{title.toUpperCase()}
					</h1>
					<div className=':uno: grid grid-cols-1 space-y-4 mt-4'>
						{news.slice(0, 6).map((post, index) => (
							<Novelty key={index} data={post} />
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
