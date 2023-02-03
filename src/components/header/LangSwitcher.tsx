import { FC, useState } from 'react'
import { supportedLngs } from '../../i18n'
import i18next from 'i18next'

const LangSwitcher: FC = () => {
	const [locale, setLocale] = useState(i18next.language || 'en')
	const languageHandler = async (e: any) => {
		const newLang = e.target.value
		if (locale !== newLang) {
			setLocale(newLang)
			await i18next.changeLanguage(newLang)
		}
	}

	return (
		<>
			<select
				className='bg-gray-800 rounded-lg text-xs'
				onChange={languageHandler}
				value={locale}>
				{supportedLngs?.map((item, index) => (
					<option key={index} value={item}>
						{item?.toUpperCase()}
					</option>
				))}
			</select>
		</>
	)
}

export default LangSwitcher
