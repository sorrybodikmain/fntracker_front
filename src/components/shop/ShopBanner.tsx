import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const ShopBanner: FC = () => {
	const [value, setValue] = useState(new Date())
	useEffect(() => {
		const interval = setInterval(() => setValue(new Date()), 1000)
		return () => clearInterval(interval)
	}, [])
	const { t } = useTranslation('shop')
	return (
		<div className=':uno: container mx-auto text-white p-3'>
			<div className=':uno: flex flex-col gap-y-3 bg-gray-700 p-4 rounded'>
				<h1 className=':uno: text-lg'> {t('banner_title')}</h1>
				<p className=':uno: text-sm'>{t('banner_body')}</p>
				<h3 className=':uno: text-center text-md font-bold pt-2'>
					{t('banner_update')}
					{` ${23 - value.getUTCHours()}:${59 - value.getUTCMinutes()}:${
						60 - value.getUTCSeconds()
					}`}
				</h3>
			</div>
		</div>
	)
}

export default ShopBanner
