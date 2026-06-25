'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import type { BRCosmetic } from '@/types/fnapi'
import { useDebounce } from '@/hooks/useDebounce'
import { logEvent } from '@/utils/gtag.utils'
import { cosmeticInstanceId, dedupeCosmeticsById } from '@/utils/cosmetic'
import { CosmeticItem } from './CosmeticItem'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Input } from '@/components/ui/Input'
import { PageContainer } from '@/components/ui/PageContainer'

const PAGE_SIZE = 20

interface AllItemsSectionProps {
	cosmetics: BRCosmetic[]
}

export function AllItemsSection({ cosmetics }: AllItemsSectionProps) {
	const t = useTranslations('shop')
	const locale = useLocale()
	const [filter, setFilter] = useState('')
	const debounced = useDebounce<string>(filter, 500)
	const isSearching = debounced.length > 2
	const [searchResults, setSearchResults] = useState<BRCosmetic[]>([])
	const [searching, setSearching] = useState(false)
	const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
	const sentinelRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		setVisibleCount(PAGE_SIZE)
	}, [debounced, cosmetics])

	useEffect(() => {
		if (!isSearching) {
			setSearchResults([])
			return
		}

		setSearching(true)
		logEvent('Shop', 'Search', `SearchTerm-${debounced}`)
		fetch(
			`/api/cosmetics/search?q=${encodeURIComponent(debounced)}&lang=${locale}`
		)
			.then(res => res.json())
			.then((json: { data: BRCosmetic[] }) => {
				setSearchResults(dedupeCosmeticsById(json.data ?? []))
			})
			.catch(() => setSearchResults([]))
			.finally(() => setSearching(false))
	}, [debounced, isSearching, locale])

	const loadMore = useCallback(() => {
		setVisibleCount(prev => {
			if (prev >= cosmetics.length) return prev
			return Math.min(prev + PAGE_SIZE, cosmetics.length)
		})
	}, [cosmetics.length])

	useEffect(() => {
		if (isSearching) return

		const sentinel = sentinelRef.current
		if (!sentinel) return

		const observer = new IntersectionObserver(
			entries => {
				if (entries[0]?.isIntersecting) loadMore()
			},
			{ rootMargin: '300px' }
		)
		observer.observe(sentinel)
		return () => observer.disconnect()
	}, [isSearching, loadMore, visibleCount])

	const showedItems = isSearching
		? searchResults
		: cosmetics.slice(0, visibleCount)
	const hasMore = !isSearching && visibleCount < cosmetics.length

	return (
		<PageContainer>
			<SectionHeading>{t('items_title')}</SectionHeading>
			<div className=':uno: my-4'>
				<form onSubmit={e => e.preventDefault()}>
					<Input
						type='text'
						value={filter}
						onChange={e => setFilter(e.target.value)}
						placeholder={t('filter_placeholder')}
					/>
				</form>
				{searching ? (
					<p className=':uno: text-muted text-xs mt-2'>{t('searching')}</p>
				) : null}
				{!isSearching && cosmetics.length > 0 ? (
					<p className=':uno: text-muted/70 text-xs mt-2'>
						{t('showing_count', {
							shown: showedItems.length,
							total: cosmetics.length
						})}
					</p>
				) : null}
			</div>
			<div className=':uno: grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-5'>
				{showedItems.map((cosmetic, index) => (
					<CosmeticItem
						key={cosmeticInstanceId(cosmetic, index)}
						instanceId={cosmeticInstanceId(cosmetic, index)}
						cosmetic={cosmetic}
						likeLabel={t('like_item', {
							name: cosmetic.name ?? cosmetic.id
						})}
						unlikeLabel={t('unlike_item', {
							name: cosmetic.name ?? cosmetic.id
						})}
					/>
				))}
			</div>
			{hasMore ? (
				<div
					ref={sentinelRef}
					className=':uno: py-8 text-center text-muted text-sm'
				>
					{t('load_more')}
				</div>
			) : null}
		</PageContainer>
	)
}
