import { FC, PropsWithChildren } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import styles  from "./GalleryImage.module.css"
const GalleryImage: FC<
  PropsWithChildren<{ src: string }
  >> = ({ src }) => {
  return (<div className='flex flex-wrap w-1/3'>
      <div className='w-full p-1 md:p-2'>
        <Zoom classDialog={styles.zoom}>
          <img alt='gallery'
               className='block object-cover object-center w-full h-full rounded-lg'
               src={src} />
        </Zoom>
      </div>
    </div>
  )
}

export default GalleryImage
