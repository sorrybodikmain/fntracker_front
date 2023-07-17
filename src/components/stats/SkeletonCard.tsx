import { FC } from 'react'

const SkeletonCard: FC = () => {
	return (
		<div className='container text-white mx-auto p-3 animate-pulse'>
			<div className='mb-4 h-6 w-36 bg-gray-700 rounded' />
			<div className='rounded p-3 transition bg-gray-600 h-44' />
		</div>
	)
}

export default SkeletonCard
