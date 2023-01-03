import { FC } from 'react'
import Post from './Post'
import useSWR from 'swr'
import i18next from 'i18next'
import { IOnePost, IPostsResponse } from '@/api/types/posts.type'
import { fetcher } from '@/libs/apiFetcher'
import { useTranslation } from 'react-i18next'
import SkeletonPosts from '@/components/posts/SkeletonPosts'

const AllPostsResponse: FC = () => {
	const { t } = useTranslation('home')
	const filterDate = new Date()
	filterDate.setDate(filterDate.getDate() - 20)
	const { data } = useSWR<IPostsResponse>(
		`https://fortniteapi.io/v1/news?lang=${i18next.language}&type=br`,
		fetcher
	)
	return (
		<section id='news'>
			<div className='bg-gray-900 p-6 text-white'>
				<div className='container mx-auto'>
					<h2 className='text-md border-l-4 border-primary pl-2'>
						{t('posts_title').toUpperCase()}
					</h2>
					<div className='grid grid-cols-1 space-y-4 mt-4'>
						{data ?

							data?.news
								.filter(item => new Date(item.date) > filterDate)
								.map((post: IOnePost, index: number) => (
									<Post key={index} data={post} />
								))
							:
							<SkeletonPosts />
						}

					</div>
				</div>
			</div>
		</section>
	)
}

export default AllPostsResponse