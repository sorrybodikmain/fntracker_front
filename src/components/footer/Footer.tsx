import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const Footer: FC = () => {
	const { t } = useTranslation('footer')
	return (
		<>
			<footer className='mx-auto container text-gray-300 border-t-2 border-gray-600'>
				<div className='w-full p-10'>
					<ul className='flex items-center justify-center text-center text-gray-500'>
						<li className='px-4 text-gray-100 text-xs'>
							{t('footer_body')}
						</li>
					</ul>
				</div>
			</footer>
		</>
	)
}
export default Footer
