import { FC } from 'react'
import MapsCompare from '@/components/map/MapsCompare'
import AppHelmet from '@/components/AppHelmet'
import { useTranslation } from 'react-i18next'

const MapComparePage: FC = () => {
	const { t } = useTranslation('compare-maps')
	return (
		<>
			<AppHelmet
				title={t('pageTitle')}
				desc={t('pageDesc')!}
				img='https://media.fortniteapi.io/images/maps/map-23.30.png?width=800'
			/>
			<MapsCompare />
		</>
	)
}

export default MapComparePage
