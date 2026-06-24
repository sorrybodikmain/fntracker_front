import { getLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { SearchBar } from '@/components/search-bar/SearchBar'
import { AllNews } from '@/components/news/AllNews'
import { MiniShop } from '@/components/mini-shop/MiniShop'
import { getNews, getShop } from '@/lib/api/fortnite'
import type { INewsResponse, ShopTodayResponse } from '@/interfaces'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('header')
	return { title: `${t('home_link')} | FNTracker` }
}

export default async function HomePage() {
	const locale = await getLocale()
	const t = await getTranslations('home')

	const [shopData, newsData] = await Promise.all([
		getShop(locale) as Promise<ShopTodayResponse>,
		getNews(locale) as Promise<INewsResponse>
	])

	return (
		<div>
			<SearchBar />
			<div className=':uno: container flex flex-col-reverse lg:flex-row mx-auto'>
				<AllNews news={newsData.news} title={t('posts_title')} />
				<MiniShop
					shop={shopData.shop}
					title={t('shop_title')}
					shopLinkLabel={t('shop_link')}
				/>
			</div>
		</div>
	)
}
