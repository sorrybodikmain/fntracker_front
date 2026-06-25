'use client'

import { useCallback, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { logEvent } from '@/utils/gtag.utils'
import { useLikesStore } from '@/stores/use-likes-store'

const BURST_COUNT = 10
const ICON_SIZE = 22

interface LikeButtonProps {
	itemId: string
	itemName: string
	likeLabel: string
	unlikeLabel: string
	className?: string
}

export function LikeButton({
	itemId,
	itemName,
	likeLabel,
	unlikeLabel,
	className
}: LikeButtonProps) {
	const items = useLikesStore(s => s.items)
	const toggleLike = useLikesStore(s => s.toggleLike)
	const isLiked = items.includes(itemId)
	const reduceMotion = useReducedMotion()
	const [pulse, setPulse] = useState(0)
	const [burst, setBurst] = useState(0)

	const handleClick = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault()
			e.stopPropagation()
			const nowLiked = toggleLike(itemId)
			logEvent(
				'Shop',
				nowLiked ? 'Liked' : 'Unliked',
				`${itemName}(${itemId})`
			)
			if (!reduceMotion) {
				setPulse(k => k + 1)
				if (nowLiked) setBurst(k => k + 1)
			}
		},
		[itemId, itemName, reduceMotion, toggleLike]
	)

	return (
		<motion.button
			type='button'
			onClick={handleClick}
			whileTap={reduceMotion ? undefined : { scale: 0.9 }}
			className={`${className ?? ''} relative inline-flex shrink-0 items-center justify-center overflow-visible leading-none`}
			aria-pressed={isLiked}
			aria-label={isLiked ? unlikeLabel : likeLabel}
			suppressHydrationWarning
		>
			{burst > 0 && !reduceMotion ? (
				<span
					key={burst}
					className=':uno: pointer-events-none absolute inset-0'
					aria-hidden
				>
					{Array.from({ length: BURST_COUNT }, (_, i) => {
						const angle = (i / BURST_COUNT) * Math.PI * 2
						const dist = 22 + (i % 2) * 6
						const color = i % 2 === 0 ? '#FF2D95' : '#00E5FF'
						return (
							<motion.span
								key={i}
								className=':uno: absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full'
								style={{ backgroundColor: color }}
								initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
								animate={{
									x: Math.cos(angle) * dist,
									y: Math.sin(angle) * dist,
									opacity: 0,
									scale: 0
								}}
								transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
							/>
						)
					})}
				</span>
			) : null}

			<AnimatePresence>
				{isLiked && !reduceMotion ? (
					<motion.span
						key={`ring-${pulse}`}
						className=':uno: pointer-events-none absolute inset-0 rounded-full'
						initial={{ opacity: 0.7, scale: 0.6 }}
						animate={{ opacity: 0, scale: 2.2 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5, ease: 'easeOut' }}
						style={{
							boxShadow:
								'0 0 14px rgba(255,45,149,0.75), 0 0 28px rgba(0,229,255,0.35)'
						}}
						aria-hidden
					/>
				) : null}
			</AnimatePresence>

			<span
				className=':uno: relative z-10 grid place-items-center'
				style={{ width: ICON_SIZE, height: ICON_SIZE }}
			>
				<AnimatePresence mode='wait' initial={false}>
					{isLiked ? (
						<motion.span
							key={`liked-${pulse}`}
							className=':uno: grid place-items-center text-red-500 drop-shadow-[0_0_10px_rgba(255,45,149,0.65)]'
							initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={reduceMotion ? undefined : { scale: 0.5, opacity: 0 }}
							transition={{
								type: 'spring',
								stiffness: 520,
								damping: 14,
								mass: 0.65
							}}
						>
							<AiFillHeart size={ICON_SIZE} />
						</motion.span>
					) : (
						<motion.span
							key={`unliked-${pulse}`}
							className=':uno: grid place-items-center text-current'
							initial={reduceMotion ? false : { scale: 0.85, opacity: 0.5 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={reduceMotion ? undefined : { scale: 0.85, opacity: 0 }}
							transition={{ duration: 0.2, ease: 'easeOut' }}
						>
							<AiOutlineHeart size={ICON_SIZE} />
						</motion.span>
					)}
				</AnimatePresence>
			</span>
		</motion.button>
	)
}
