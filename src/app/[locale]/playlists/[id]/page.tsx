import type { Metadata } from 'next'
import { PlaylistPageOpener } from '@/components/playlists/PlaylistPageOpener'
import { PageContainer } from '@/components/ui/PageContainer'

interface PlaylistPageProps {
	params: Promise<{ id: string }>
}

export async function generateMetadata({
	params
}: PlaylistPageProps): Promise<Metadata> {
	const { id } = await params
	return { title: `${id} | FNTracker` }
}

export default async function PlaylistPage({ params }: PlaylistPageProps) {
	const { id } = await params

	return (
		<PageContainer className=':uno: min-h-[50vh]'>
			<PlaylistPageOpener id={id} />
		</PageContainer>
	)
}
