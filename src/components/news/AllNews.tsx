import { INewsResponse, INovelty } from '@/interfaces/posts.interface.ts'
import SkeletonNews from '@/components/news/SkeletonNews'
import { useTranslation } from 'react-i18next'
import { fetcher } from '@/libs/apiFetcher'
import Novelty from './Novelty'
import i18next from 'i18next'
import { FC } from 'react'
import useSWR from 'swr'

const AllNews: FC = () => {
	const { t } = useTranslation('home')
	const filterDate = new Date()
	filterDate.setDate(filterDate.getDate() - 20)
	const { data } = useSWR<INewsResponse>(
		`https://fortniteapi.io/v1/news?lang=${i18next.language}&type=br`,
		fetcher
	)

	return (
		<section id='news'>
			<div className=':uno: bg-gray-900 p-6 text-white'>
				<div className=':uno: container mx-auto'>
					<h1 className=':uno: text-md border-l-4 border-primary pl-2'>
						{t('posts_title').toUpperCase()}
					</h1>
					<div className=':uno: grid grid-cols-1 space-y-4 mt-4'>
						{data ? (
							data?.news
								.slice(0, 6)
								.map((post: INovelty, index: number) => (
									<Novelty key={index} data={post} />
								))
						) : (
							<SkeletonNews />
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

export default AllNews
