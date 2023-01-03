import { FC } from 'react'

const SkeletonMiniShop: FC = () => {
	const arr = Array(6).fill(0)
	return (
		<>
			{arr.map((value, index) => (
				<div key={value+index} className='relative overflow-hidden rounded-lg transition animate-pulse'>
					<div className='w-full h-40 sm:h-44 md:h-52 lg:h-36 bg-gray-400' />
					<div className='absolute bottom-0 w-full bg-gray-600 h-9' />
				</div>
			))}
		</>
	)
}

export default SkeletonMiniShop
