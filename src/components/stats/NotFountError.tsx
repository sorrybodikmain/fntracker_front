import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const NotFountError: FC = () => {
	const { t } = useTranslation('stats')
	return (
		<div className='container text-white mx-auto p-3 min-h-screen'>
			<div className='flex flex-wrap bg-red-600 rounded-lg p-3 hover:scale-[1.01] transition'>
				<h1 className='text-lg'>{t('profile_error')}</h1>
				<Link to='/'
							className='text-center '
				>
					Return to HomePage
				</Link>
			</div>
		</div>
	)
}

export default NotFountError
