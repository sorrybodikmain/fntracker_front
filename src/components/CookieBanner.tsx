import { FC, useEffect, useState } from 'react'
import { BiCookie } from 'react-icons/bi'
import { useCookies } from 'react-cookie'
import { useTranslation } from 'react-i18next'

const CookieBanner: FC = () => {
	const [showBanner, setShowBanner] = useState(false)
	const [cookies, setCookie] = useCookies(['fntracker-cookie'])
	const { t } = useTranslation('cookie-banner')
	const handleClick = (e: any) => {
		e.preventDefault()
		setShowBanner(!showBanner)
		setCookie('fntracker-cookie', true, {
			maxAge: 24 * 60 * 60 * 365
		})
	}
	useEffect(() => {
		if (!cookies['fntracker-cookie'])
			setShowBanner(true)
	}, [])

	return (
		<>
			{showBanner ? <>
				<div className='fixed bottom-5 z-10 text-white p-3 left-1/2 -translate-x-1/2 container'>
					<div
						className='flex flex-wrap bg-gray-700 shadow-xl shadow-gray-900 rounded-lg p-2 transition hover:scale-[1.01] '>
						<div className='w-full flex items-center justify-between'>
							<div className='w-full flex flex-row'>
								<BiCookie className='my-1 mx-2 text-lg sm:text-sm' />
								{t('banner_body')}
							</div>
							<div className='flex ml-3 gap-x-2 text-xs'>
								<a href='https://www.google.com/' className='hover:bg-indigo-400 p-1 rounded border-[1px]'>{t('banner_decline')}</a>
								<button onClick={handleClick} className='bg-primary hover:bg-indigo-400 p-1 rounded'>{t('banner_accept')}</button>
							</div>
						</div>
					</div>
				</div>
			</> : null}
		</>

	)
}

export default CookieBanner
