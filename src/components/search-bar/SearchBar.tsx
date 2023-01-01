import { FC } from 'react'
import Search from './Search'
import { useTranslation } from 'react-i18next'

const SearchBar: FC = () => {
	const {t} = useTranslation('home')
	return (
		<>
			<section id='search' className='bg-gray-900'>
				<div className='relative h-80'>
					<img
						src='/images/search-bg.jpg'
						alt='search-bg-image'
						className='blur-sm brightness-50 object-cover h-full w-full'
					/>
					<div className='absolute left-0 right-0 top-0 py-20 text-white text-center'>
						<h2 className='text-md sm:text-lg md:text-xl'>
							{t('seacrh_title')}
						</h2>
						<Search />
						<div className='text-sm text-gray-300'>
							{t('search_link')}
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default SearchBar
