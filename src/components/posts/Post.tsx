import { FC, PropsWithChildren } from 'react'
import { IOnePost } from '@/types/posts.type'
import { fixImageWidth } from '@/utils/api.utils'

const Post: FC<PropsWithChildren<{ data: IOnePost }>> = ({ data }) => {
	return (
		<div className='flex flex-wrap bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition-all'>
			<div className='relative bg-cover w-full md:w-4/12 mx-auto mb-3 sm:mb-0'>
				<img
					src={fixImageWidth(data.image, 360)}
					alt={'post-image'}
					className='object-cover w-full h-full rounded-lg'
				/>
			</div>
			<div className='w-full md:w-8/12 xl:w-6/12 px-3 mb-4 md:mb-0 mr-auto'>
				<h5 className='text-lg mb-2'>{data.title}</h5>
				<p className='text-gray-300'>{data.body}</p>
				<p className='text-gray-500'>{new Date(data.date).toLocaleString()}</p>
			</div>
		</div>
	)
}

export default Post