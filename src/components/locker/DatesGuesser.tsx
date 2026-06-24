'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { ShopItemResponse } from '@/interfaces'
import { ImSpinner9 } from 'react-icons/im'

interface DatesGuesserProps {
	data: ShopItemResponse
}

export function DatesGuesser({ data }: DatesGuesserProps) {
	const t = useTranslations('locker')
	const [dates, setDates] = useState<string[]>()
	const [loaded, setLoaded] = useState(false)

	const handleLoad = () => {
		setLoaded(true)
		const historyDates = [...data.item.shopHistory].reverse()
		fetch('/api/dates', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ dates: historyDates })
		})
			.then(res => res.json())
			.then(value => {
				setDates(value)
				setLoaded(false)
			})
			.catch(() => setTimeout(() => setLoaded(false), 1000))
	}

	return (
		<>
			<h1 className=':uno: border-l-4 border-primary pl-2 my-4'>
				{t('possible_dates').toUpperCase()}
			</h1>
			<div className=':uno: flex bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition'>
				<div className=':uno: relative w-full px-1 text-gray-300'>
					{!dates ? (
						<div className=':uno: flex items-center justify-between'>
							<p className=':uno: font-medium text-white sm:text-sm'>
								{t('dates_guesser_title')}
							</p>
							<button
								onClick={handleLoad}
								className=':uno: flex items-center px-4 py-2 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-200'
							>
								{loaded ? (
									<>
										<ImSpinner9 className=':uno: inline w-4 h-4 mr-2 text-black animate-spin' />
										<span>{t('loading')}</span>
									</>
								) : (
									<span>{t('generate')}</span>
								)}
							</button>
						</div>
					) : (
						<div className=':uno: grid grid-cols-4 lg:grid-cols-8 gap-2'>
							{dates.map((value, index) => (
								<p key={index} className=':uno: inline-flex flex-col mx-auto'>
									{value}
								</p>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	)
}
