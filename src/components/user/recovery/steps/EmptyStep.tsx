import { FC, PropsWithChildren } from 'react'

const EmptyStep: FC<PropsWithChildren<{ title: string, body: string, }>> = ({ title, body }) => {

	return (
		<div
			className='my-6 bg-gray-600 rounded-md shadow-2xl shadow-blue-800 p-5 text-gray-300  hover:-translate-y-1 transition-all'>
			<h1 className='text-gray-200 font-bold text-2xl mb-1'>{title}</h1>
			<p className='text-sm font-normal text-gray-300 mb-3'>{body}</p>
		</div>
	)
}

export default EmptyStep
