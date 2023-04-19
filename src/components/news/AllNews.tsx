import { FC } from 'react'
import Novelty from './Novelty'
import useSWR from 'swr'
import i18next from 'i18next'
import { fetcher } from '@/libs/apiFetcher'
import { useTranslation } from 'react-i18next'
import SkeletonNews from '@/components/news/SkeletonNews'
import { INewsResponse, INovelty } from '@/types/posts.type'

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
			<div className='bg-gray-900 p-6 text-white'>
				<div className='container mx-auto'>
					<h1 className='text-md border-l-4 border-primary pl-2'>
						{t('posts_title').toUpperCase()}
					</h1>
					<div className='grid grid-cols-1 space-y-4 mt-4'>
						{data ?
							data?.news
								.slice(0,6)
								.map((post: INovelty, index: number) => (
									<Novelty key={index} data={post} />
								))
							:
							<SkeletonNews />
						}

					</div>
				</div>
			</div>
		</section>
	)
}

export default AllNews