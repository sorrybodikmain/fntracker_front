import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/Button'

export default async function NotFoundPage() {
	const t = await getTranslations('404')

	return (
		<section className=':uno: min-h-[70vh] flex items-center justify-center px-4'>
			<div className=':uno: text-center max-w-lg'>
				<h1 className=':uno: font-display text-8xl md:text-9xl font-bold text-primary drop-shadow-[0_0_40px_rgba(0,229,255,0.5)]'>
					404
				</h1>
				<p className=':uno: mt-4 font-display text-2xl md:text-3xl font-bold text-foreground'>
					{t('went_wrong')}
				</p>
				<p className=':uno: mt-3 text-muted'>{t('404_desc')}</p>
				<div className=':uno: mt-8'>
					<Button href='/' size='lg'>
						{t('404_butt')}
					</Button>
				</div>
			</div>
		</section>
	)
}
