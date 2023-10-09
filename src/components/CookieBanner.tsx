import { FC, useEffect, useState } from 'react'
import { BiCookie } from 'react-icons/bi'
import { useCookies } from 'react-cookie'
import { useTranslation } from 'react-i18next'

const CookieBanner: FC = () => {
	const [showBanner, setShowBanner] = useState(false)
	const [cookies, setCookie] = useCookies()
	const { t } = useTranslation('cookie-banner')
	const handleClick = (e: any) => {
		e.preventDefault()
		setShowBanner(!showBanner)
		setCookie('fntracker-allow-cookie', true, {
			maxAge: 24 * 60 * 60 * 365,
			path: '/'
		})
	}
	useEffect(() => {
		if (!cookies['fntracker-allow-cookie']) setShowBanner(true)
	}, [])

	return (
		<>
			{showBanner ? (
				<>
					<div className=':uno: fixed bottom-5 z-10 text-white p-3 left-1/2 -translate-x-1/2 container'>
						<div className=':uno: flex flex-wrap bg-gray-700 shadow-xl shadow-gray-900 rounded-lg p-2 transition hover:scale-[1.01] '>
							<div className=':uno: w-full flex items-center justify-between'>
								<div className=':uno: w-full flex flex-row'>
									<BiCookie className=':uno: my-1 mx-2 text-lg sm:text-sm' />
									{t('banner_body')}
								</div>
								<div className=':uno: flex ml-3 gap-x-2 text-xs'>
									<button
										onClick={handleClick}
										className=':uno: bg-primary hover:bg-indigo-400 p-1 rounded'
									>
										{t('banner_accept')}
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			) : null}
		</>
	)
}

export default CookieBanner
