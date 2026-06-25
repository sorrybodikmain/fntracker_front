'use client'

import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'motion/react'
import type { BRCosmetic } from '@/types/fnapi'
import { Badge } from '@/components/ui/Badge'

interface CosmeticDetailMetaProps {
	cosmetic: BRCosmetic
}

export function CosmeticDetailMeta({ cosmetic }: CosmeticDetailMetaProps) {
	const t = useTranslations('locker')
	const locale = useLocale()
	const history = [...(cosmetic.shopHistory ?? [])].reverse()

	return (
		<motion.div
			layout
			initial={{ opacity: 0, x: 16 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ delay: 0.12, duration: 0.35 }}
			className=':uno: flex-1 min-w-0 flex flex-col'
		>
			<h2
				id='cosmetic-modal-title'
				className=':uno: font-display text-2xl md:text-3xl font-bold text-foreground leading-tight pr-2'
			>
				{cosmetic.name}
			</h2>

			<div className=':uno: flex flex-wrap gap-2 mt-3'>
				{cosmetic.rarity?.displayValue ? (
					<Badge variant='primary'>{cosmetic.rarity.displayValue}</Badge>
				) : null}
				{cosmetic.type?.displayValue ? (
					<Badge variant='muted'>{cosmetic.type.displayValue}</Badge>
				) : null}
			</div>

			{cosmetic.description ? (
				<p className=':uno: mt-4 text-sm text-muted leading-relaxed'>
					{cosmetic.description}
				</p>
			) : null}

			{cosmetic.introduction?.text ? (
				<p className=':uno: mt-4 text-sm text-foreground border-l-2 border-accent pl-3'>
					{cosmetic.introduction.text}
				</p>
			) : null}

			{cosmetic.added ? (
				<p className=':uno: mt-3 text-xs text-muted'>
					{t('card_appeared')}{' '}
					{new Date(cosmetic.added).toLocaleDateString(locale)}
				</p>
			) : null}

			{history.length > 0 ? (
				<motion.div
					layout
					className=':uno: mt-6 pt-5 border-t border-white/10'
				>
					<p className=':uno: font-display text-xs uppercase tracking-wider text-primary mb-3'>
						{t('table_title')}
					</p>
					<ul className=':uno: flex flex-wrap gap-2 max-h-28 overflow-y-auto'>
						{history.map((date, index) => (
							<li key={index}>
								<Badge variant='muted'>
									{new Date(date).toLocaleDateString(locale)}
								</Badge>
							</li>
						))}
					</ul>
				</motion.div>
			) : null}
		</motion.div>
	)
}
