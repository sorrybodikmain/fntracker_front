import { getLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { BannerCard } from '@/components/banners/BannerCard'
import { PageContainer } from '@/components/ui/PageContainer'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getBannerColors, getBanners } from '@/lib/api/fortnite'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('banners')
	return { title: `${t('title')} | FNTracker` }
}

export default async function BannersPage() {
	const locale = await getLocale()
	const t = await getTranslations('banners')
	const [banners, colors] = await Promise.all([
		getBanners(locale),
		getBannerColors()
	])

	return (
		<PageContainer>
			<SectionHeading>{t('title')}</SectionHeading>
			<h2 className=':uno: text-sm text-muted mb-3 uppercase tracking-wider'>
				{t('colors_title')}
			</h2>
			<div className=':uno: flex flex-wrap gap-2 mb-8'>
				{colors
					.filter(color => color?.color)
					.map(color => (
						<div
							key={color.id}
							className=':uno: w-10 h-10 rounded-full border-2 border-white/20 hover:scale-110 transition cursor-default shadow-glowSm'
							style={{ backgroundColor: color.color }}
							title={color.color}
						/>
					))}
			</div>
			<div className=':uno: grid grid-cols-2 md:grid-cols-4 gap-4 lg:grid-cols-6 xl:grid-cols-8 lg:gap-5'>
				{banners
					.filter(banner => banner?.id)
					.map(banner => (
						<BannerCard key={banner.id} banner={banner} />
					))}
			</div>
		</PageContainer>
	)
}
