import Image from 'next/image'
import Link from 'next/link'
import type { Playlist } from '@/types/fnapi'

interface PlaylistCardProps {
	playlist: Playlist
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
	const showcase =
		playlist.images?.showcase ?? playlist.images?.missionIcon ?? null

	return (
		<Link
			href={`/playlists/${playlist.id}`}
			className=':uno: block rounded-lg overflow-hidden bg-gray-600 hover:scale-[1.02] transition'
		>
			<div className=':uno: relative w-full h-36'>
				{showcase ? (
					<Image
						src={showcase}
						alt={playlist.name ?? playlist.id}
						fill
						className=':uno: object-cover'
						sizes='(max-width: 640px) 50vw, 200px'
					/>
				) : null}
			</div>
			<div className=':uno: p-3'>
				<h2 className=':uno: text-white font-semibold text-sm'>
					{playlist.name ?? playlist.id}
				</h2>
				{playlist.subName ? (
					<p className=':uno: text-gray-400 text-xs mt-1'>{playlist.subName}</p>
				) : null}
			</div>
		</Link>
	)
}
