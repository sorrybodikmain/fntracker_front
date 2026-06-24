'use client'

import { useTransition } from 'react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { locales } from '@/i18n/routing'
import { logEvent } from '@/utils/gtag.utils'

export function LangSwitcher() {
	const locale = useLocale()
	const router = useRouter()
	const [isPending, startTransition] = useTransition()

	const languageHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newLang = e.target.value
		if (locale !== newLang) {
			logEvent('Language', 'Change', `Change-To-${newLang}`)
			document.cookie = `fntracker-locale=${newLang}; path=/; max-age=${60 * 60 * 24 * 365}`
			startTransition(() => router.refresh())
		}
	}

	return (
		<select
			className=':uno: bg-gray-800 rounded-lg text-xs'
			onChange={languageHandler}
			value={locale}
			disabled={isPending}
		>
			{locales.map((item, index) => (
				<option key={index} value={item}>
					{item.toUpperCase()}
				</option>
			))}
		</select>
	)
}
