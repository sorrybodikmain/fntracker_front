'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import 'react-medium-image-zoom/dist/styles.css'
import styles from '@/styles/Zoom.module.css'

const Zoom = dynamic(() => import('react-medium-image-zoom'), { ssr: false })

type ZoomableImageProps = {
	src: string
	alt: string
	className?: string
	priority?: boolean
} & (
		| { fill: true; sizes?: string; width?: never; height?: never }
		| { fill?: false; width: number; height: number; sizes?: never }
	)

export function ZoomableImage({
	src,
	alt,
	width,
	height,
	fill,
	sizes = '100vw',
	className,
	priority
}: ZoomableImageProps) {
	return (
		<Zoom classDialog={styles.zoom}>
			<span className={fill ? ':uno: relative block h-full w-full' : undefined}>
				{fill ? (
					<Image
						src={src}
						alt={alt}
						fill
						sizes={sizes}
						className={className}
						priority={priority}
					/>
				) : (
					<Image
						src={src}
						alt={alt}
						width={width}
						height={height}
						className={className}
						priority={priority}
					/>
				)}
			</span>
		</Zoom>
	)
}
