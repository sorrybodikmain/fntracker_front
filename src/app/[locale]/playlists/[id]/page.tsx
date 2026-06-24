import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPlaylistById } from '@/lib/api/fortnite'

interface PlaylistPageProps {
	params: Promise<{ id: string }>
}

export async function generateMetadata({
	params
}: PlaylistPageProps): Promise<Metadata> {
	const { id } = await params
	const locale = await getLocale()
	try {
		const playlist = await getPlaylistById(id, locale)
		return { title: `${playlist.name} | FNTracker` }
	} catch {
		return { title: 'Playlist | FNTracker' }
	}
}

export default async function PlaylistPage({ params }: PlaylistPageProps) {
	const { id } = await params
	const locale = await getLocale()
	const t = await getTranslations('playlists')

	let playlist
	try {
		playlist = await getPlaylistById(id, locale)
	} catch {
		notFound()
	}

	const showcase =
		playlist.images?.showcase ?? playlist.images?.missionIcon ?? null

	return (
		<div className=':uno: container mx-auto text-white p-3 min-h-screen'>
			<div className=':uno: rounded-lg bg-gray-600 p-4'>
				<div className=':uno: flex flex-col md:flex-row gap-4'>
					{showcase ? (
						<div className=':uno: relative w-full md:w-72 h-48 shrink-0'>
							<Image
								src={showcase}
								alt={playlist.name ?? playlist.id}
								fill
								className=':uno: object-cover rounded-lg'
								sizes='288px'
							/>
						</div>
					) : null}
					<div>
						<h1 className=':uno: text-2xl font-bold'>
							{playlist.name ?? playlist.id}
						</h1>
						{playlist.subName ? (
							<p className=':uno: text-gray-300 mt-1'>{playlist.subName}</p>
						) : null}
						<p className=':uno: text-gray-400 mt-3'>
							{playlist.description ?? ''}
						</p>
						<div className=':uno: grid grid-cols-2 gap-2 mt-4 text-sm text-gray-300'>
							<p>
								{t('players')}: {playlist.minPlayers ?? 0}–
								{playlist.maxPlayers ?? 0}
							</p>
							<p>
								{t('team_size')}: {playlist.maxTeamSize ?? 0}
							</p>
							<p>
								{t('game_type')}: {playlist.gameType ?? '—'}
							</p>
							<p>
								{t('ltm')}:{' '}
								{playlist.isLimitedTimeMode ? t('yes') : t('no')}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
