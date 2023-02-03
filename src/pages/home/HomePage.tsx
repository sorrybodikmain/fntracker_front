import { FC } from 'react'
import SearchBar from '@/components/search-bar/SearchBar'
import AllPosts from '@/components/news/AllNews'
import MiniShop from '@/components/mini-shop/MiniShop'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const HomePage: FC = () => {
	const { t } = useTranslation('header')
	return (
		<>
			<Helmet>
				<title>{t('home_link')} | FNTracker</title>
			</Helmet>
			<div>
				<SearchBar />
				<div className='container flex flex-col-reverse lg:flex-row mx-auto'>
					<AllPosts />
					<MiniShop />
				</div>
			</div>
		</>
	)
}

export default HomePage
