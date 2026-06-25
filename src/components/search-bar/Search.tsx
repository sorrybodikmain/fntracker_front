'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/Input'
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
		<form onSubmit={handleSubmit} className=':uno: w-full max-w-md'>
			<Input
				type='search'
				name='nickname'
				placeholder={t('seach_input')}
				className=':uno: text-center font-display tracking-wide'
			/>
		</form>
	)
}
