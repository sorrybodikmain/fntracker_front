import { FC, PropsWithChildren } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import styles from '@/styles/Zoom.module.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const GalleryImage: FC<
  PropsWithChildren<{ src: string }
  >> = ({ src }) => {
  return (<div className='flex flex-wrap w-1/5'>
      <div className='w-full p-1 md:p-2'>
        <Zoom classDialog={styles.zoom}>
          <LazyLoadImage
            alt='gallery'
            className='block object-cover object-center w-full h-full rounded-lg'
            src={src} />
        </Zoom>
      </div>
    </div>
  )
}

export default GalleryImage
