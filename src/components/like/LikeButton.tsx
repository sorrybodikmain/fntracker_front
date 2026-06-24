'use client'

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { logEvent } from '@/utils/gtag.utils'
import { useLikesStore } from '@/stores/use-likes-store'

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

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		const nowLiked = toggleLike(itemId)
		logEvent(
			'Shop',
			nowLiked ? 'Liked' : 'Unliked',
			`${itemName}(${itemId})`
		)
		if (nowLiked) toast.success(likeLabel)
		else toast.error(unlikeLabel)
	}

	return (
		<button
			type='button'
			onClick={handleClick}
			className={`${className ?? ''} ${isLiked ? 'text-red-500' : ''}`}
			aria-pressed={isLiked}
			suppressHydrationWarning
		>
			{isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
		</button>
	)
}
