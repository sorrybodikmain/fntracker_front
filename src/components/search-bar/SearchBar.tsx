import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Search } from './Search'

export async function SearchBar() {
	const t = await getTranslations('home')

	return (
		<section
			id='search'
			className=':uno: relative overflow-hidden border-b border-white/8 bg-void'
		>
			<div className=':uno: relative min-h-72 md:min-h-96'>
				<Image
					src='/images/bg.jpg'
					alt=''
					fill
					priority
					className=':uno: object-cover blur-md brightness-[0.45] scale-105'
					sizes='100vw'
				/>
				<div
					className=':uno: absolute inset-0 bg-gradient-to-b from-void/30 via-void/50 to-void/70'
					aria-hidden
				/>
				<div className=':uno: relative container mx-auto px-4 md:px-6 py-16 md:py-24 text-center'>
					<h1 className=':uno: font-display text-3xl md:text-5xl font-bold uppercase tracking-wider text-foreground animate-fadeUp drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]'>
						{t('seacrh_title')}
					</h1>
					<div className=':uno: mt-8 flex justify-center animate-fadeUp'>
						<Search />
					</div>
					<p className=':uno: mt-4 text-sm text-foreground/80 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]'>
						{t('search_link')}
					</p>
				</div>
			</div>
		</section>
	)
}
