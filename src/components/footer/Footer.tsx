import { getTranslations } from 'next-intl/server'

export async function Footer() {
	const t = await getTranslations('footer')

	return (
		<footer className=':uno: mx-auto container text-gray-300 border-t-2 border-gray-600'>
			<div className=':uno: w-full p-10'>
				<ul className=':uno: flex items-center justify-center text-center text-gray-500'>
					<li className=':uno: px-4 text-gray-100 text-xs'>{t('footer_body')}</li>
				</ul>
			</div>
		</footer>
	)
}
