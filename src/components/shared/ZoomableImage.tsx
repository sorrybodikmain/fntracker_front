'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import 'react-medium-image-zoom/dist/styles.css'
import styles from '@/styles/Zoom.module.css'

const Zoom = dynamic(() => import('react-medium-image-zoom'), { ssr: false })

interface ZoomableImageProps {
	src: string
	alt: string
	width: number
	height: number
	className?: string
	priority?: boolean
}

export function ZoomableImage({
	src,
	alt,
	width,
	height,
	className,
	priority
}: ZoomableImageProps) {
	return (
		<Zoom classDialog={styles.zoom}>
			<Image
				src={src}
				alt={alt}
				width={width}
				height={height}
				className={className}
				priority={priority}
			/>
		</Zoom>
	)
}
