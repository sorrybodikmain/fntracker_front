import { FC, useEffect, useState } from 'react'
import useSWR from 'swr'
import { MapsResponse } from '@/types/map.types'
import { fetcher } from '@/libs/apiFetcher'
import { generatePathToMapImg } from '@/utils/api.utils'
import { useTranslation } from 'react-i18next'
import {
	ReactCompareSlider,
	ReactCompareSliderImage
} from 'react-compare-slider'
import { logEvent } from '@/libs/gtag.utils'

const MapsCompare: FC = () => {
	const { data } = useSWR<MapsResponse>(
		'https://fortniteapi.io/v1/maps/list',
		fetcher
	)
	const { t } = useTranslation('compare-maps')
	const [leftMapId, setLeftMapId] = useState<string>('23.00')
	const [rightMapId, setRightMapId] = useState<string>('23.30')
	const [enablePOI, setEnablePOI] = useState<boolean>(false)

	const preloadMaps = async (ids: string[]) =>
		ids.map(id => (new Image().src = generatePathToMapImg(id, !enablePOI)))

	useEffect(() => {
		;(async () => preloadMaps([leftMapId, rightMapId]))()
	}, [leftMapId, rightMapId])

	return (
		<section id='map-images'>
			<div className='container mx-auto text-white py-3 min-h-screen'>
				<div className='mx-auto rounded-xl relative max-w-3xl'>
					<h1 className='border-l-4 border-primary pl-2 mb-4'>
						{t('pageTitle')}
					</h1>
					<ReactCompareSlider
						className='rounded-xl w-full'
						itemOne={
							<ReactCompareSliderImage
								src={generatePathToMapImg(leftMapId, enablePOI)}
								alt={`map-${leftMapId}`}
								loading='eager'
							/>
						}
						itemTwo={
							<ReactCompareSliderImage
								src={generatePathToMapImg(rightMapId, enablePOI)}
								alt={`map-${rightMapId}`}
								loading='eager'
							/>
						}
					/>
					<div className='absolute left-1/2 -translate-x-1/2 top-16 z-10 w-11/12 flex justify-between items-center'>
						<div className='border-[1px] p-1 rounded-xl bg-gray-600'>
							<select
								className='w-full outline-none border-none bg-gray-600'
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
								{data?.maps.map((item, index) => (
									<option key={index} value={item.patchVersion}>
										{item.patchVersion}
									</option>
								))}
							</select>
						</div>

						<div className='flex items-center border-[1px] px-2 py-1.5 rounded-xl bg-gray-600'>
							<input
								type='checkbox'
								checked={enablePOI}
								onChange={() => setEnablePOI(!enablePOI)}
								className='w-4 h-4 text-blue-100'
							/>
							<label className='mx-2 text-xs font-medium text-gray-300'>
								POI
							</label>
						</div>

						<div className='border-[1px] p-1 rounded-xl bg-gray-600'>
							<select
								className='w-full outline-none border-none bg-gray-600'
								value={rightMapId}
								onChange={e => setRightMapId(e.target.value)}
							>
								{data?.maps.map((item, index) => (
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

export default MapsCompare
