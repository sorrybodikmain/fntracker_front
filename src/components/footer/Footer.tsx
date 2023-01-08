import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Footer: FC = () => {
	const { t } = useTranslation('footer')
	return (
		<>
			<footer className='mx-auto container text-gray-300 border-t-2 border-gray-600'>
				<div className='w-full p-10'>
					<ul className='flex items-center justify-center text-center text-gray-500'>
						<li>
							<Link to={'/terms'} className='hover:text-gray-100 text-xs'>
								{t('contact_link')}
							</Link>
						</li>
						<li className='px-4 text-gray-100 text-xs'>
							{t('footer_body')}
						</li>
						<li>
							<Link to={'/policy'} className='hover:text-gray-100 text-xs'>
								{t('policy_link')}
							</Link>
						</li>
					</ul>
				</div>
			</footer>
		</>
	)
}
export default Footer
