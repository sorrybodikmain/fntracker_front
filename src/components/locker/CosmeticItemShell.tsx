'use client'

import type { ReactNode } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import {
	useCosmeticCardActive,
	useCosmeticModalStore
} from '@/stores/use-cosmetic-modal-store'
import {
	cosmeticImageLayoutId,
	cosmeticPanelLayoutId
} from './cosmetic-layout'

const layoutSpring = { type: 'spring' as const, stiffness: 420, damping: 36 }

interface CosmeticItemShellProps {
	instanceId: string
	cosmeticId: string
	name: string
	imageUrl: string | null
	aspect?: 'portrait' | 'square'
	overlay?: ReactNode
	actions?: ReactNode
}

export function CosmeticItemShell({
	instanceId,
	cosmeticId,
	name,
	imageUrl,
	aspect = 'portrait',
	overlay,
	actions
}: CosmeticItemShellProps) {
	const open = useCosmeticModalStore(s => s.open)
	const isActive = useCosmeticCardActive(instanceId)
	const reduceMotion = useReducedMotion()

	return (
		<motion.article
			layout={!reduceMotion}
			layoutId={
				!isActive && !reduceMotion
					? cosmeticPanelLayoutId(instanceId)
					: undefined
			}
			transition={{ layout: layoutSpring }}
			animate={{ opacity: isActive ? 0 : 1 }}
			className=':uno: group relative overflow-hidden rounded-xl border border-white/8 bg-surface backdrop-blur-sm hover:border-primary/30 hover:shadow-glowSm'
			style={{ pointerEvents: isActive ? 'none' : 'auto' }}
		>
			<div className=':uno: relative'>
				<button
					type='button'
					onClick={() => open(cosmeticId, imageUrl, instanceId)}
					className=':uno: block w-full cursor-pointer text-left'
					aria-label={name}
				>
					{!isActive ? (
						<motion.div
							layoutId={
								!reduceMotion ? cosmeticImageLayoutId(instanceId) : undefined
							}
							transition={layoutSpring}
							className={`:uno: relative w-full overflow-hidden ${aspect === 'square' ? 'aspect-square' : 'aspect-[4/5]'
								}`}
						>
							{imageUrl ? (
								<Image
									src={imageUrl}
									alt={name}
									fill
									className=':uno: object-cover transition-transform duration-300 group-hover:scale-110'
									sizes='(max-width: 640px) 50vw, 200px'
								/>
							) : null}
						</motion.div>
					) : (
						<div
							className={`:uno: w-full ${aspect === 'square' ? 'aspect-square' : 'aspect-[4/5]'
								}`}
							aria-hidden
						/>
					)}
				</button>

				{actions ? (
					<div className=':uno: absolute top-2.5 right-2.5 z-20 pointer-events-auto'>
						{actions}
					</div>
				) : null}

				<div className=':uno: absolute inset-x-0 bottom-0 bg-gradient-to-t from-void via-void/90 to-transparent p-3 pt-10 pointer-events-none'>
					<h3 className=':uno: text-center text-sm font-medium text-foreground truncate'>
						{name}
					</h3>
					{overlay}
				</div>
			</div>
		</motion.article>
	)
}
