import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Search } from './Search'

export async function SearchBar() {
	const t = await getTranslations('home')

	return (
		<section id='search' className=':uno: bg-gray-900'>
			<div className=':uno: relative h-80'>
				<Image
					src='/images/search-bg.webp'
					alt='search-bg-image'
					fill
					priority
					className=':uno: blur-sm brightness-50 object-cover transition'
				/>
				<div className=':uno: absolute left-0 right-0 top-0 py-20 text-white text-center'>
					<h1 className=':uno: text-md sm:text-lg md:text-xl pb-2'>
						{t('seacrh_title').toUpperCase()}
					</h1>
					<Search />
					<div className=':uno: pt-1 text-xs md:text-sm text-gray-300'>
						{t('search_link')}
					</div>
				</div>
			</div>
		</section>
	)
}
