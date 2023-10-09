import { FC } from 'react'
import SearchBar from '@/components/search-bar/SearchBar'
import AllPosts from '@/components/news/AllNews'
import MiniShop from '@/components/mini-shop/MiniShop'
import { useTranslation } from 'react-i18next'
import AppHelmet from '@/components/AppHelmet'

const HomePage: FC = () => {
	const { t } = useTranslation('header')
	return (
		<>
			<AppHelmet title={t('home_link')!} />
			<div>
				<SearchBar />
				<div className=':uno: container flex flex-col-reverse lg:flex-row mx-auto'>
					<AllPosts />
					<MiniShop />
				</div>
			</div>
		</>
	)
}

export default HomePage
