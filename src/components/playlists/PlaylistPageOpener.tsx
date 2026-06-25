'use client'

import { useEffect } from 'react'
import { usePlaylistModalStore } from '@/stores/use-playlist-modal-store'

interface PlaylistPageOpenerProps {
	id: string
}

export function PlaylistPageOpener({ id }: PlaylistPageOpenerProps) {
	const open = usePlaylistModalStore(s => s.open)

	useEffect(() => {
		open(id)
	}, [id, open])

	return null
}
