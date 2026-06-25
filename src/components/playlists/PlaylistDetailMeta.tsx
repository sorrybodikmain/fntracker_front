'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'motion/react'
import type { PlaylistDetail } from '@/types/fnapi'
import { Badge } from '@/components/ui/Badge'

interface PlaylistDetailMetaProps {
	playlist: PlaylistDetail
}

export function PlaylistDetailMeta({ playlist }: PlaylistDetailMetaProps) {
	const t = useTranslations('playlists')

	return (
		<motion.div
			layout
			initial={{ opacity: 0, x: 16 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ delay: 0.12, duration: 0.35 }}
			className=':uno: flex-1 min-w-0 flex flex-col'
		>
			<h2
				id='playlist-modal-title'
				className=':uno: font-display text-2xl md:text-3xl font-bold text-foreground leading-tight'
			>
				{playlist.name ?? playlist.id}
			</h2>
			{playlist.subName ? (
				<p className=':uno: text-primary mt-1'>{playlist.subName}</p>
			) : null}
			{playlist.description ? (
				<p className=':uno: mt-4 text-sm text-muted leading-relaxed'>
					{playlist.description}
				</p>
			) : null}
			<div className=':uno: flex flex-wrap gap-2 mt-5'>
				<Badge variant='muted'>
					{t('players')}: {playlist.minPlayers ?? 0}–{playlist.maxPlayers ?? 0}
				</Badge>
				<Badge variant='muted'>
					{t('team_size')}: {playlist.maxTeamSize ?? 0}
				</Badge>
				<Badge variant='primary'>
					{t('game_type')}: {playlist.gameType ?? '—'}
				</Badge>
				<Badge variant='accent'>
					{t('ltm')}: {playlist.isLimitedTimeMode ? t('yes') : t('no')}
				</Badge>
			</div>
		</motion.div>
	)
}
