import { FC } from 'react'
import Search from './Search'
import { useTranslation } from 'react-i18next'

const SearchBar: FC = () => {
	const { t } = useTranslation('home')
	return (
		<>
			<section id='search' className='bg-gray-900'>
				<div className='relative h-80'>
					<img
						src='/images/search-bg.webp'
						alt='search-bg-image'
						decoding='async'
						loading='eager'
						className='blur-sm brightness-50 object-cover h-full w-full transition'
					/>
					<div className='absolute left-0 right-0 top-0 py-20 text-white text-center'>
						<h1 className='text-md sm:text-lg md:text-xl'>
							{t('seacrh_title').toUpperCase()}
						</h1>
						<Search />
						<div className='text-xs md:text-sm text-gray-300'>
							{t('search_link')}
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default SearchBar
