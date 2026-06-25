'use client'

import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { useLocale, useTranslations } from 'next-intl'
import { IoClose } from 'react-icons/io5'
import type { BRCosmetic } from '@/types/fnapi'
import { LikeButton } from '@/components/like/LikeButton'
import { useCosmeticModalStore } from '@/stores/use-cosmetic-modal-store'
import { CosmeticDetailMeta } from './CosmeticDetailMeta'
import { Skeleton } from '@/components/ui/Skeleton'
import {
	cosmeticImageLayoutId,
	cosmeticPanelLayoutId
} from './cosmetic-layout'
import { fixImageWidth } from '@/utils'
import { cosmeticDisplayImage } from '@/utils/cosmetic'

interface CosmeticDetailModalProps {
	cosmeticId: string
	onClose: () => void
}

const layoutSpring = { type: 'spring' as const, stiffness: 420, damping: 36 }

export function CosmeticDetailModal({
	cosmeticId,
	onClose
}: CosmeticDetailModalProps) {
	const locale = useLocale()
	const t = useTranslations('locker')
	const reduceMotion = useReducedMotion()
	const previewImage = useCosmeticModalStore(s => s.previewImage)
	const instanceId = useCosmeticModalStore(s => s.instanceId) ?? cosmeticId
	const [cosmetic, setCosmetic] = useState<BRCosmetic | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [mounted, setMounted] = useState(false)

	const displayImage =
		cosmetic != null
			? fixImageWidth(cosmeticDisplayImage(cosmetic), 600)
			: previewImage

	const loadCosmetic = useCallback(async () => {
		setLoading(true)
		setError(false)
		try {
			const res = await fetch(
				`/api/cosmetics/${encodeURIComponent(cosmeticId)}?lang=${locale}`
			)
			if (!res.ok) throw new Error('not found')
			const json = (await res.json()) as { data: BRCosmetic }
			setCosmetic(json.data)
		} catch {
			setError(true)
			setCosmetic(null)
		} finally {
			setLoading(false)
		}
	}, [cosmeticId, locale])

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		loadCosmetic()
	}, [loadCosmetic])

	useEffect(() => {
		const prev = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = prev
		}
	}, [])

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [onClose])

	if (!mounted) return null

	return createPortal(
		<div className=':uno: fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6'>
			<motion.button
				type='button'
				aria-label='Close'
				className=':uno: absolute inset-0 bg-void/80 backdrop-blur-md cursor-pointer'
				initial={reduceMotion ? false : { opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={reduceMotion ? undefined : { opacity: 0 }}
				transition={{ duration: 0.25 }}
				onClick={onClose}
			/>

			<motion.div
				role='dialog'
				aria-modal='true'
				layoutId={
					!reduceMotion ? cosmeticPanelLayoutId(instanceId) : undefined
				}
				transition={{ layout: layoutSpring }}
				className=':uno: relative z-10 w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] overflow-hidden rounded-t-2xl sm:rounded-2xl border border-white/10 bg-gray-900/95 backdrop-blur-xl shadow-glass'
				onClick={e => e.stopPropagation()}
			>
				<div className=':uno: absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60' />

				<div className=':uno: flex items-center justify-end gap-2 px-4 sm:px-6 pt-4 pb-1 shrink-0'>
					{cosmetic ? (
						<LikeButton
							itemId={cosmetic.id}
							itemName={cosmetic.name}
							likeLabel={t('like_item', { name: cosmetic.name })}
							unlikeLabel={t('unlike_item', { name: cosmetic.name })}
							className=':uno: flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-surface text-muted hover:border-red-500/40 transition-colors cursor-pointer'
						/>
					) : null}
					<button
						type='button'
						onClick={onClose}
						className=':uno: flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-surface text-muted hover:text-primary hover:border-primary/40 transition-all cursor-pointer'
						aria-label='Close'
					>
						<IoClose className=':uno: w-5 h-5' />
					</button>
				</div>

				<div className=':uno: overflow-y-auto max-h-[calc(92vh-3.5rem)] sm:max-h-[calc(88vh-3.5rem)] px-5 sm:px-8 pb-5 sm:pb-8 pt-2'>
					{error ? (
						<p className=':uno: text-center text-muted py-12'>Item not found</p>
					) : (
						<div className=':uno: flex flex-col lg:flex-row gap-6 lg:gap-8'>
							<motion.div
								layout
								className=':uno: relative w-full lg:w-5/12 shrink-0'
							>
								<motion.div
									layoutId={
										!reduceMotion
											? cosmeticImageLayoutId(instanceId)
											: undefined
									}
									transition={layoutSpring}
									className=':uno: relative aspect-square rounded-2xl overflow-hidden border border-primary/20 shadow-glowSm'
								>
									<div
										className=':uno: absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/15'
										aria-hidden
									/>
									{displayImage ? (
										<Image
											src={displayImage}
											alt={cosmetic?.name ?? cosmeticId}
											fill
											className=':uno: object-cover relative z-10 p-4'
											sizes='(max-width: 1024px) 100vw, 400px'
											priority
										/>
									) : null}
								</motion.div>
							</motion.div>

							{loading ? (
								<div className=':uno: flex-1 space-y-3'>
									<Skeleton className=':uno: h-8 w-2/3' />
									<Skeleton className=':uno: h-4 w-full' />
									<Skeleton className=':uno: h-4 w-5/6' />
									<Skeleton className=':uno: h-20 w-full mt-4' />
								</div>
							) : cosmetic ? (
								<CosmeticDetailMeta cosmetic={cosmetic} />
							) : null}
						</div>
					)}
				</div>
			</motion.div>
		</div>,
		document.body
	)
}
