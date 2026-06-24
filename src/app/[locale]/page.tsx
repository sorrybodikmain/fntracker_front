import { getLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { SearchBar } from '@/components/search-bar/SearchBar'
import { NewsTabs } from '@/components/news/NewsTabs'
import { MiniShop } from '@/components/mini-shop/MiniShop'
import {
	getCreativeNews,
	getNews,
	getShop,
	getStwNews
} from '@/lib/api/fortnite'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('header')
	return { title: `${t('home_link')} | FNTracker` }
}

export default async function HomePage() {
	const locale = await getLocale()
	const t = await getTranslations('home')

	const [shop, brNews, stwNews, creativeNews] = await Promise.all([
		getShop(locale),
		getNews(locale),
		getStwNews(locale),
		getCreativeNews(locale)
	])

	return (
		<div>
			<SearchBar />
			<div className=':uno: container flex flex-col-reverse lg:flex-row mx-auto'>
				<NewsTabs
					brNews={brNews}
					stwNews={stwNews}
					creativeNews={creativeNews}
				/>
				<MiniShop
					entries={shop.entries}
					title={t('shop_title')}
					shopLinkLabel={t('shop_link')}
				/>
			</div>
		</div>
	)
}
