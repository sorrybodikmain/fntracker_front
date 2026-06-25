import type { Metadata } from 'next'
import { pageTitle } from '@/config/site'
import { LockerPageOpener } from '@/components/locker/LockerPageOpener'
import { PageContainer } from '@/components/ui/PageContainer'

interface ItemPageProps {
	params: Promise<{ id: string }>
}

export async function generateMetadata({
	params
}: ItemPageProps): Promise<Metadata> {
	const { id } = await params
	return { title: pageTitle(id) }
}

export default async function ItemPage({ params }: ItemPageProps) {
	const { id } = await params

	return (
		<PageContainer className=':uno: min-h-[50vh]'>
			<LockerPageOpener id={id} />
		</PageContainer>
	)
}
