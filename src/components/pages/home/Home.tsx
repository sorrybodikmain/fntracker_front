import { FC } from 'react'
import Layout from '@/components/layout/Layout'
import { useTranslation } from 'react-i18next'
import SearchBar from '@/components/layout/search-bar/SearchBar'
import MiniShop from '@/components/layout/mini-shop/MiniShop'
import Posts from '@/components/layout/posts/Posts'

const Home: FC = () => {
	const { t } = useTranslation('common')
	return (
		<>
			<Layout>
				<SearchBar />
				<div className='container flex flex-col lg:flex-row mx-auto'>
					<Posts />
					<MiniShop />
				</div>
			</Layout>
		</>
	)
}

export default Home
