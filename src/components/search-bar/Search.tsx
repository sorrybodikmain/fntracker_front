'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type { AccountIdStr } from '@/interfaces'
import { useDebounce } from '@/hooks/useDebounce'
import { useOutside } from '@/hooks/useOutside'
import { logEvent } from '@/utils/gtag.utils'

export function Search() {
	const t = useTranslations('home')
	const [nickname, setNickname] = useState('')
	const [data, setData] = useState<AccountIdStr>()
	const { ref, isShow, setIsShow } = useOutside(false)
	const debounced = useDebounce<string>(nickname)
	const router = useRouter()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		router.push(`/stats/${nickname}`)
		logEvent('Search-Profile', 'Search', `Searched-'${nickname}'`)
	}

	useEffect(() => {
		if (debounced.length > 2) {
			fetch(`/api/lookup?username=${encodeURIComponent(nickname)}`)
				.then(res => res.json())
				.then(res => {
					setIsShow(true)
					setData(res)
				})
		} else {
			setIsShow(false)
		}
	}, [debounced, nickname, setIsShow])

	return (
		<div className=':uno: flex items-center justify-center'>
			<div className=':uno: relative text-sm'>
				<form onSubmit={handleSubmit}>
					<input
						type='search'
						value={nickname}
						onChange={e => setNickname(e.target.value)}
						placeholder={t('seach_input')}
						className=':uno: w-full sm:w-80 h-9 bg-gray-800 rounded-lg p-2 hover:scale-105 transition'
					/>
				</form>

				{isShow && (
					<div
						ref={ref}
						className=':uno: absolute z-50 w-full sm:w-80 bg-gray-800 rounded-md mt-1 max-h-72 overflow-y-auto'
					>
						<ul className=':uno: divide-y-[1px]'>
							{data?.all_matches?.map(item => (
								<li
									key={item.sortPosition}
									className=':uno: flex justify-between p-2'
								>
									<Link href={`/stats/${item.matches[0].value}`}>
										{item.matches[0].value}
									</Link>
									<p className=':uno: text-gray-400'>
										{item.matches[0].platform}
									</p>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	)
}
