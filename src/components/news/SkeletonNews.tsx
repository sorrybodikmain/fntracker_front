import { FC } from 'react'

const SkeletonNews: FC = () => {
	const arr = Array(6).fill(0)
	return (
		<>
			{arr.map((value, index) => (
				<div
					key={value + index}
					className=':uno: flex flex-wrap bg-gray-600 rounded p-3 animate-pulse w-full md:w-[38rem]'
				>
					<div className=':uno: w-72 md:w-3/12 mb-3 md:mb-0 mx-auto'>
						<div className=':uno: relative bg-cover shadow-lg h-32 w-full md:w-52 bg-gray-700 rounded' />
					</div>
					<div className=':uno: relative w-72 md:w-9/12 xl:w-7/12 md:pl-20 mb-4 mx-auto md:mr-auto'>
						<div className=':uno: my-2 h-5 w-full bg-gray-700' />
						<div className=':uno: my-2 h-3 w-full bg-gray-700' />
						<div className=':uno: h-3 w-full bg-gray-700' />
					</div>
				</div>
			))}
		</>
	)
}

export default SkeletonNews
