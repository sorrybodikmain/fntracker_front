import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NotFoundPage: FC = () => {
	const { t } = useTranslation('404')
	return (
		<>
			<section className=':uno: bg-gray-900 text-white min-h-screen flex items-center'>
				<div className=':uno: px-4 mx-auto max-w-screen-xl lg:px-6'>
					<div className=':uno: mx-auto max-w-screen-sm text-center'>
						<h1 className=':uno: mb-4 text-7xl tracking-tight font-extra lg:text-9xl text-primary'>
							404
						</h1>
						<p className=':uno: mb-4 text-3xl tracking-tight font-bold md:text-4xl text-white'>
							{t('went_wrong')}
						</p>
						<p className=':uno: mb-8 text-md font-light text-gray-400'>
							{t('404_desc')}{' '}
						</p>
						<Link
							to='/'
							className=':uno: bg-primary hover:bg-blue-600 transition-all rounded-lg text-sm p-2'
						>
							{t('404_butt')}
						</Link>
					</div>
				</div>
			</section>
		</>
	)
}

export default NotFoundPage
