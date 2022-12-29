import { FC } from 'react'
import Search from '@/components/layout/search-bar/Search'

const SearchBar: FC = () => {
	return (
		<>
			<section id='search' className='bg-gray-900'>
				<div className='relative h-75'>
					<img
						src={'/images/search-bg.jpg'}
						alt={'background-image'}
						className='blur-sm brightness-50 object-cover'
					/>
					<div className='relative mx-auto py-20 text-white text-center'>
						<h2 className='text-lg sm:text-xl md:text-2xl'>
							FIND YOUR FORTNITE STATS
						</h2>
						<Search />
						<div className='text-sm text-gray-300'>
							Search by EGS, Steam and PSN
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default SearchBar
