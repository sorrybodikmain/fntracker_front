import { FC, PropsWithChildren } from 'react'
import { SectionImages } from '@/interfaces/shop.interface.ts'
import GalleryImage from '@/components/locker/gallery/GalleryImage'
import { useTranslation } from 'react-i18next'

const LockerGallery: FC<PropsWithChildren<{ data: SectionImages[] }>> = ({
	data
}) => {
	const { t } = useTranslation('locker')
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

export default LockerGallery
