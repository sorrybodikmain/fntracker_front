'use client'

import { useTransition } from 'react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { locales } from '@/i18n/routing'
import { logEvent } from '@/utils/gtag.utils'

const localeLabels: Record<string, string> = {
	en: 'EN',
	ru: 'RU'
}

export function LangSwitcher() {
	const locale = useLocale()
	const router = useRouter()
	const [isPending, startTransition] = useTransition()

	const handleChange = (newLang: string) => {
		if (locale !== newLang) {
			logEvent('Language', 'Change', `Change-To-${newLang}`)
			document.cookie = `fntracker-locale=${newLang}; path=/; max-age=${60 * 60 * 24 * 365}`
			startTransition(() => router.refresh())
		}
	}

	return (
		<div className=':uno: flex gap-1 rounded-lg border border-white/10 bg-surface p-1'>
			{locales.map(item => (
				<button
					key={item}
					type='button'
					disabled={isPending}
					onClick={() => handleChange(item)}
					className={`:uno: rounded-md px-2.5 py-1 text-xs font-semibold transition-all duration-200 cursor-pointer ${locale === item
						? 'bg-primary/20 text-primary border border-primary/40'
						: 'text-muted hover:text-foreground border border-transparent'
						}`}
				>
					{localeLabels[item] ?? item.toUpperCase()}
				</button>
			))}
		</div>
	)
}
