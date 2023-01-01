import { FC, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import i18next from 'i18next'


const LangSwitcher: FC = () => {
	const [cookies, setCookie] = useCookies(['fntracker-locale'])
	const [locale, setLocale] = useState()
	const allLocales = ['ru', 'de', 'es', 'fr', 'it', 'pl', 'en']
	console.log(i18next.resolvedLanguage)
	const loc = [i18next.language, ...allLocales.filter(item => item !== i18next.language)]
	const handleLocale = (e: any) => {
		setCookie('fntracker-locale', e.target.value, {
			maxAge: 24 * 60 * 60 * 365
		})
		setLocale(e.target.value)
		i18next.changeLanguage(e.target.value)
		window.location.reload()
	}
	useEffect(() => {
		if (cookies['fntracker-locale'])
			i18next.changeLanguage(cookies['fntracker-locale'])
	}, [])
	return (
		<>
			<select
				className='bg-gray-800 rounded-lg text-xs'
				onChange={handleLocale}
				value={locale}
			>
				{loc?.map((item, index) => (
					<option key={index} value={item}>
						{item?.toUpperCase()}
					</option>
				))}
			</select>
		</>
	)
}

export default LangSwitcher
