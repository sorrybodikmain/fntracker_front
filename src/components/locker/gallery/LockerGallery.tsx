import { getTranslations } from 'next-intl/server'
import type { SectionImages } from '@/interfaces'
import { GalleryImage } from '@/components/locker/gallery/GalleryImage'

interface LockerGalleryProps {
	data: SectionImages[]
}

export async function LockerGallery({ data }: LockerGalleryProps) {
	const t = await getTranslations('locker')

	return (
		<section>
			<h1 className=':uno: border-l-4 border-primary pl-2 my-4 uppercase'>
				{t('images_title')}
			</h1>
			<div className=':uno: flex flex-wrap bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition container'>
				<div className=':uno: flex flex-wrap -m-1 md:-m-2'>
					{data.map((img, index) => (
						<GalleryImage src={img.background} key={index} />
					))}
				</div>
			</div>
		</section>
	)
}
