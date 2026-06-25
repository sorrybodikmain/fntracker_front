'use client'

import { useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence } from 'motion/react'
import { usePlaylistModalStore } from '@/stores/use-playlist-modal-store'
import { PlaylistDetailModal } from './PlaylistDetailModal'

export function PlaylistModalHost() {
	const router = useRouter()
	const pathname = usePathname()
	const { playlistId, isOpen, close, clear } = usePlaylistModalStore()

	const handleClose = useCallback(() => {
		close()
		if (pathname.includes('/playlists/')) {
			router.push('/playlists')
		}
	}, [close, pathname, router])

	return (
		<AnimatePresence mode='popLayout' onExitComplete={clear}>
			{isOpen && playlistId ? (
				<PlaylistDetailModal
					key={playlistId}
					playlistId={playlistId}
					onClose={handleClose}
				/>
			) : null}
		</AnimatePresence>
	)
}
