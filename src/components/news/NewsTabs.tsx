'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { BRNews, CreativeNews, STWNews } from '@/types/fnapi'
import { AllNews } from '@/components/news/AllNews'

interface NewsTabsProps {
	brNews: BRNews
	stwNews: STWNews
	creativeNews: CreativeNews
}

type NewsTab = 'br' | 'stw' | 'creative'

function hasNewsItems(news: BRNews) {
	return (news.motds?.length ?? 0) + (news.messages?.length ?? 0) > 0
}

export function NewsTabs({ brNews, stwNews, creativeNews }: NewsTabsProps) {
	const t = useTranslations('home')
	const newsByTab = {
		br: brNews,
		stw: stwNews,
		creative: creativeNews
	}
	const availableTabs = (['br', 'stw', 'creative'] as NewsTab[]).filter(tab =>
		hasNewsItems(newsByTab[tab])
	)
	const [active, setActive] = useState<NewsTab>(availableTabs[0] ?? 'br')

	if (availableTabs.length === 0) {
		return null
	}

	if (availableTabs.length === 1) {
		return (
			<AllNews news={newsByTab[availableTabs[0]]} title={t('posts_title')} />
		)
	}

	return (
		<div>
			<div className=':uno: flex flex-wrap gap-2 mb-4 px-6 container mx-auto'>
				{availableTabs.map(tab => (
					<button
						key={tab}
						type='button'
						onClick={() => setActive(tab)}
						className={`:uno: px-3 py-1.5 rounded-lg text-sm transition ${active === tab
							? 'bg-primary text-white'
							: 'bg-gray-700 text-gray-300 hover:bg-gray-600'
							}`}
					>
						{t(`news_tab_${tab}`)}
					</button>
				))}
			</div>
			<AllNews news={newsByTab[active]} title={t('posts_title')} />
		</div>
	)
}
