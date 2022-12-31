import { FC, PropsWithChildren } from 'react'
import { OnePost } from '@/api/types/posts.type'

const Post: FC<PropsWithChildren<{ data: OnePost }>> = ({ data }) => {
	return (
		<div className='flex flex-wrap bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition'>
			<div className='w-full md:w-3/12 mb-3 md:mb-0 mx-auto'>
				<div className='relative bg-cover shadow-lg'>
					<img
						src={data.image}
						alt={'post-image'}
						className='object-cover w-full rounded-lg'
					/>
				</div>
			</div>
			<div className='w-full md:w-9/12 xl:w-7/12 px-3 mb-4 md:mb-0 mr-auto'>
				<h5 className='text-lg mb-2'>{data.title}</h5>
				<p className='text-gray-300'>{data.body}</p>
				<p className='text-gray-500'>{new Date(data.date).toLocaleString()}</p>
			</div>
		</div>
	)
}

export default Post