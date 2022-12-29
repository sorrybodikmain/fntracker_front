import {FC, useState} from 'react'
import {useCookies} from 'react-cookie'

const LangSwitcher: FC = () => {
    const [cookies, setCookie] = useCookies()
    const [locale, setLocale] = useState()
    const loc = ['en', 'ru', 'fr', 'de']
    const handleLocale = (e: any) => {
        setCookie('fntracker-locale', e.target.value, {
            maxAge: 24 * 60 * 60 * 365
        })
        setLocale(e.target.value)
    }
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
