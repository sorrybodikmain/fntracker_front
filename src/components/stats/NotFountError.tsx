import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const NotFountError: FC = () => {
	const { t } = useTranslation('stats')
	return (
		<div className='container text-white mx-auto p-3'>
			<div className='flex flex-wrap bg-red-600 rounded-lg p-3 hover:scale-[1.01] transition'>
				<h4 className='text-lg'>{t('profile_error')}</h4>
			</div>
		</div>
	)
}

export default NotFountError
