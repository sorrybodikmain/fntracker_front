import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { SiteLogo } from '@/components/brand/SiteLogo'
import { siteConfig } from '@/config/site'

export async function Footer() {
	const t = await getTranslations('footer')
	const h = await getTranslations('header')

	const links = [
		{ name: h('home_link'), href: '/' },
		{ name: h('shop_link'), href: '/shop' },
		{ name: h('maps_link'), href: '/map' },
		{ name: h('playlists_title'), href: '/playlists' }
	]

	return (
		<footer className=':uno: mt-auto border-t border-white/8 bg-void/60 backdrop-blur-sm'>
			<div className=':uno: container mx-auto px-4 md:px-6 py-10'>
				<div className=':uno: grid grid-cols-1 md:grid-cols-3 gap-8 items-start'>
					<div>
						<p className=':uno: font-display text-xl font-bold tracking-widest'>
							<SiteLogo />
						</p>
						<p className=':uno: mt-2 text-sm text-muted max-w-xs'>
							{t('footer_body')}
						</p>
					</div>

					<nav className=':uno: flex flex-wrap gap-x-6 gap-y-2'>
						{links.map(link => (
							<Link
								key={link.href}
								href={link.href}
								className=':uno: text-sm text-muted hover:text-primary transition-colors cursor-pointer'
							>
								{link.name}
							</Link>
						))}
					</nav>

					<div className=':uno: text-sm text-muted md:text-right space-y-1'>
						<p>
							<Link
								href='/'
								className=':uno: hover:text-primary transition-colors cursor-pointer'
							>
								{t('policy_link')}
							</Link>
						</p>
						<p>
							<a
								href={`mailto:${siteConfig.contactEmail}`}
								className=':uno: hover:text-primary transition-colors cursor-pointer'
							>
								{t('contact_link')}
							</a>
						</p>
					</div>
				</div>
			</div>
		</footer>
	)
}
