import { FC } from 'react'
import Layout from '@/components/Layout'
import SearchBar from '@/components/search-bar/SearchBar'
import AllPosts from '@/components/posts/AllPosts'
import MiniShop from '@/components/mini-shop/MiniShop'

const HomePage: FC = () => {
	return (
		<>
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
