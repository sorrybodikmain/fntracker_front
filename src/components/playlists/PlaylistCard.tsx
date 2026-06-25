'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import type { Playlist } from '@/types/fnapi'
import { usePlaylistCardActive, usePlaylistModalStore } from '@/stores/use-playlist-modal-store'
import { playlistDisplayImage } from '@/utils/playlist'
import {
	playlistImageLayoutId,
	playlistPanelLayoutId
} from './playlist-layout'

const layoutSpring = { type: 'spring' as const, stiffness: 420, damping: 36 }

interface PlaylistCardProps {
	playlist: Playlist
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
	const open = usePlaylistModalStore(s => s.open)
	const isActive = usePlaylistCardActive(playlist.id)
	const reduceMotion = useReducedMotion()
	const showcase = playlistDisplayImage(playlist)
	const name = playlist.name ?? playlist.id

	return (
		<motion.article
			layout={!reduceMotion}
			layoutId={
				!isActive && !reduceMotion
					? playlistPanelLayoutId(playlist.id)
					: undefined
			}
			transition={{ layout: layoutSpring }}
			animate={{ opacity: isActive ? 0 : 1 }}
			className=':uno: group relative overflow-hidden rounded-xl border border-white/8 bg-surface backdrop-blur-sm hover:border-primary/30 hover:shadow-glowSm cursor-pointer'
			style={{ pointerEvents: isActive ? 'none' : 'auto' }}
		>
			<button
				type='button'
				onClick={() => open(playlist.id, showcase)}
				className=':uno: block w-full cursor-pointer text-left'
				aria-label={name}
			>
				{!isActive ? (
					<motion.div
						layoutId={
							!reduceMotion ? playlistImageLayoutId(playlist.id) : undefined
						}
						transition={layoutSpring}
						className=':uno: relative w-full aspect-video overflow-hidden'
					>
						{showcase ? (
							<Image
								src={showcase}
								alt={name}
								fill
								className=':uno: object-cover transition-transform duration-300 group-hover:scale-105'
								sizes='(max-width: 640px) 50vw, 200px'
							/>
						) : null}
					</motion.div>
				) : (
					<div className=':uno: w-full aspect-video' aria-hidden />
				)}
				<div className=':uno: p-3'>
					<h2 className=':uno: font-display text-sm font-semibold text-foreground truncate'>
						{name}
					</h2>
					{playlist.subName ? (
						<p className=':uno: text-muted text-xs mt-1 truncate'>
							{playlist.subName}
						</p>
					) : null}
				</div>
			</button>
		</motion.article>
	)
}
