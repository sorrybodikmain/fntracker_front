import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export async function NotFountError() {
	const t = await getTranslations('stats')

	return (
		<Card className=':uno: p-6 border-accent/30' glow>
			<h1 className=':uno: font-display text-lg text-accent'>{t('profile_error')}</h1>
			<div className=':uno: mt-4'>
				<Button href='/' variant='secondary' size='sm'>
					Return to Home
				</Button>
			</div>
		</Card>
	)
}
