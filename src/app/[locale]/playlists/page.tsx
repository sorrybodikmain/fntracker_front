import { getLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { pageTitle } from '@/config/site'
import { PlaylistCard } from '@/components/playlists/PlaylistCard'
import { PageContainer } from '@/components/ui/PageContainer'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getPlaylists } from '@/lib/api/fortnite'
import { playlistHasImage } from '@/utils/playlist'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('playlists')
	return { title: pageTitle(t('title')) }
}

export default async function PlaylistsPage() {
	const locale = await getLocale()
	const t = await getTranslations('playlists')
	const playlists = await getPlaylists(locale)
	const playlistsWithImages = playlists.filter(
		playlist => playlist?.id && playlistHasImage(playlist)
	)

	return (
		<PageContainer>
			<SectionHeading>{t('title')}</SectionHeading>
			<div className=':uno: grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4 xl:grid-cols-5 lg:gap-5'>
				{playlistsWithImages.map(playlist => (
					<PlaylistCard key={playlist.id} playlist={playlist} />
				))}
			</div>
		</PageContainer>
	)
}
