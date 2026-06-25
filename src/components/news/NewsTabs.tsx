'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { BRNews, CreativeNews, STWNews } from '@/types/fnapi'
import { AllNews } from '@/components/news/AllNews'
import { Tabs } from '@/components/ui/Tabs'
import { SectionHeading } from '@/components/ui/SectionHeading'

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
			<div className=':uno: flex-1 p-4 md:p-6'>
				<AllNews news={newsByTab[availableTabs[0]]} title={t('posts_title')} />
			</div>
		)
	}

	const tabs = availableTabs.map(tab => ({
		id: tab,
		label: t(`news_tab_${tab}`)
	}))

	return (
		<div className=':uno: flex-1 p-4 md:p-6'>
			<SectionHeading>{t('posts_title')}</SectionHeading>
			<Tabs
				tabs={tabs}
				activeId={active}
				onChange={id => setActive(id as NewsTab)}
				className=':uno: mb-6'
			/>
			<AllNews news={newsByTab[active]} />
		</div>
	)
}
