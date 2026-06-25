import { getTranslations } from 'next-intl/server'
import { Search } from './Search'

export async function SearchBar() {
	const t = await getTranslations('home')

	return (
		<section
			id='search'
			className=':uno: relative overflow-hidden border-b border-white/8'
		>
			<div
				className=':uno: absolute inset-0 bg-gradient-to-br from-primary/10 via-void to-accent/10'
				aria-hidden
			/>
			<div
				className=':uno: absolute inset-0 opacity-20'
				style={{
					backgroundImage:
						'linear-gradient(rgba(0,229,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.15) 1px, transparent 1px)',
					backgroundSize: '48px 48px'
				}}
				aria-hidden
			/>
			<div className=':uno: relative container mx-auto px-4 md:px-6 py-16 md:py-24 text-center'>
				<h1 className=':uno: font-display text-3xl md:text-5xl font-bold uppercase tracking-wider text-foreground animate-fadeUp'>
					{t('seacrh_title')}
				</h1>
				<div className=':uno: mt-8 flex justify-center animate-fadeUp'>
					<Search />
				</div>
				<p className=':uno: mt-4 text-sm text-muted'>{t('search_link')}</p>
			</div>
		</section>
	)
}
