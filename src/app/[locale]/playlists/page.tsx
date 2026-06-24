import { getLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { PlaylistCard } from '@/components/playlists/PlaylistCard'
import { getPlaylists } from '@/lib/api/fortnite'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('playlists')
	return { title: `${t('title')} | FNTracker` }
}

export default async function PlaylistsPage() {
	const locale = await getLocale()
	const t = await getTranslations('playlists')
	const playlists = await getPlaylists(locale)

	return (
		<div className=':uno: container mx-auto text-white p-3 min-h-screen'>
			<h1 className=':uno: border-l-4 border-primary text-md pl-2 my-4'>
				{t('title')}
			</h1>
			<div className=':uno: grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6'>
				{playlists
					.filter(playlist => playlist?.id)
					.map(playlist => (
						<PlaylistCard key={playlist.id} playlist={playlist} />
					))}
			</div>
		</div>
	)
}
