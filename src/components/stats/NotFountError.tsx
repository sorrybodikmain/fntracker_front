import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export async function NotFountError() {
	const t = await getTranslations('stats')

	return (
		<div className=':uno: container text-white mx-auto p-3 min-h-screen'>
			<div className=':uno: flex flex-wrap bg-red-600 rounded-lg p-3 hover:scale-[1.01] transition'>
				<h1 className=':uno: text-lg'>{t('profile_error')}</h1>
				<Link href='/' className=':uno: text-center'>
					Return to HomePage
				</Link>
			</div>
		</div>
	)
}
