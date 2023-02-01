import { FC } from 'react'
import Layout from '@/components/Layout'
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
				<meta name='description' content={t('banner_title')!} />
			</Helmet>
			<Layout>
				<SearchBar />
				<div className='container flex flex-col lg:flex-row mx-auto'>
					<AllPosts />
					<MiniShop />
				</div>
			</Layout>
		</>
	)
}

export default HomePage
