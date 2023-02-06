import { FC, PropsWithChildren } from 'react'
import { SectionImages } from '@/types/shop.type'
import GalleryImage from '@/components/locker/gallery/GalleryImage'
import { useTranslation } from 'react-i18next'

const LockerGallery: FC<PropsWithChildren<{ data: SectionImages[] }>> = ({ data }) => {
	const { t } = useTranslation('locker')
	return (
		<section>
			<h2 className='border-l-4 border-primary pl-2 my-4 uppercase'>
				{t('images_title')}
			</h2>
			<div
				className='flex flex-wrap bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition container'>
					<div className='flex flex-wrap -m-1 md:-m-2'>
						{data.map((img, index) =>
							<GalleryImage src={img.background} key={index} />
						)}
					</div>
			</div>
		</section>
	)
}

export default LockerGallery
