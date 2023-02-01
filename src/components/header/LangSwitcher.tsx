import { FC, useState } from 'react'
import i18next from 'i18next'


const LangSwitcher: FC = () => {
	const [locale, setLocale] = useState()
	const allLocales = ['ru', 'de', 'es', 'fr', 'it', 'pl', 'en']
	const loc = [i18next.language, ...allLocales.filter(item => item !== i18next.language)]
	const handleLocale = async (e: any) => {
		setLocale(e.target.value)
		await i18next.changeLanguage(e.target.value)
	}

	return (
		<>
			<select
				className='bg-gray-800 rounded-lg text-xs'
				onChange={handleLocale}
				value={locale}>
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
