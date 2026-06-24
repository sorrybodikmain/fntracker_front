'use client'

import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import {
	ReactCompareSlider,
	ReactCompareSliderImage
} from 'react-compare-slider'
import type { Map } from '@/interfaces'
import { generatePathToMapImg } from '@/utils'
import { logEvent } from '@/utils/gtag.utils'

interface MapsCompareProps {
	maps: Map[]
}

export function MapsCompare({ maps }: MapsCompareProps) {
	const t = useTranslations('compare-maps')
	const locale = useLocale()
	const [leftMapId, setLeftMapId] = useState('23.00')
	const [rightMapId, setRightMapId] = useState('23.30')
	const [enablePOI, setEnablePOI] = useState(false)

	useEffect(() => {
		const preload = (id: string) => {
			const img = new window.Image()
			img.src = generatePathToMapImg(id, enablePOI, locale)
		}
		preload(leftMapId)
		preload(rightMapId)
	}, [leftMapId, rightMapId, enablePOI, locale])

	return (
		<section id='map-images'>
			<div className=':uno: container mx-auto text-white py-3 min-h-screen'>
				<div className=':uno: mx-auto rounded-xl relative max-w-3xl'>
					<h1 className=':uno: border-l-4 border-primary pl-2 mb-4'>
						{t('pageTitle')}
					</h1>
					<ReactCompareSlider
						className=':uno: rounded-xl w-full'
						itemOne={
							<ReactCompareSliderImage
								src={generatePathToMapImg(leftMapId, enablePOI, locale)}
								alt={`map-${leftMapId}`}
							/>
						}
						itemTwo={
							<ReactCompareSliderImage
								src={generatePathToMapImg(rightMapId, enablePOI, locale)}
								alt={`map-${rightMapId}`}
							/>
						}
					/>
					<div className=':uno: absolute left-1/2 -translate-x-1/2 top-16 z-10 w-11/12 flex justify-between items-center'>
						<div className=':uno: borderp-1 rounded-xl bg-gray-600'>
							<select
								className=':uno: w-full outline-none border-none bg-gray-600'
								value={leftMapId}
								onChange={e => {
									setLeftMapId(e.target.value)
									logEvent(
										'GameMaps',
										'Change',
										`Map-Change-To-${e.target.value}`
									)
								}}
							>
								{maps.map((item, index) => (
									<option key={index} value={item.patchVersion}>
										{item.patchVersion}
									</option>
								))}
							</select>
						</div>

						<div className=':uno: flex items-center border px-2 py-1.5 rounded-xl bg-gray-600'>
							<input
								type='checkbox'
								checked={enablePOI}
								onChange={() => setEnablePOI(!enablePOI)}
								className=':uno: w-4 h-4 text-blue-100'
							/>
							<label className=':uno: mx-2 text-xs font-medium text-gray-300'>
								POI
							</label>
						</div>

						<div className=':uno: border p-1 rounded-xl bg-gray-600'>
							<select
								className=':uno: w-full outline-none border-none bg-gray-600'
								value={rightMapId}
								onChange={e => {
									setRightMapId(e.target.value)
									logEvent(
										'GameMaps',
										'Change',
										`Map-Change-To-${e.target.value}`
									)
								}}
							>
								{maps.map((item, index) => (
									<option key={index} value={item.patchVersion}>
										{item.patchVersion}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
