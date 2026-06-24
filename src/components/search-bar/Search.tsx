'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { logEvent } from '@/utils/gtag.utils'

export function Search() {
	const t = useTranslations('home')
	const router = useRouter()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = e.currentTarget
		const input = form.elements.namedItem('nickname') as HTMLInputElement
		const nickname = input.value.trim()
		if (!nickname) return
		router.push(`/stats/${encodeURIComponent(nickname)}`)
		logEvent('Search-Profile', 'Search', `Searched-'${nickname}'`)
	}

	return (
		<div className=':uno: flex items-center justify-center'>
			<div className=':uno: relative text-sm'>
				<form onSubmit={handleSubmit}>
					<input
						type='search'
						name='nickname'
						placeholder={t('seach_input')}
						className=':uno: w-full sm:w-80 h-9 bg-gray-800 rounded-lg p-2 hover:scale-105 transition'
					/>
				</form>
			</div>
		</div>
	)
}
