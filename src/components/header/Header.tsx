'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { AiFillCaretDown } from 'react-icons/ai'
import { LangSwitcher } from './LangSwitcher'
import { MobNav } from './MobNav'
import { SiteLogo } from '@/components/brand/SiteLogo'

export function Header() {
    const t = useTranslations('header')
    const pathname = usePathname()

    const shopRoutes = [
        { name: t('shop_link'), href: '/shop' },
        { name: t('upcoming_title'), href: '/upcoming-items/' },
        { name: t('allitems_title'), href: '/all-items/' },
        { name: t('catalog_title'), href: '/catalog' },
        { name: t('banners_title'), href: '/banners' }
    ]

    const baseRoutes = [
        { name: t('maps_link'), href: '/map' },
        { name: t('playlists_title'), href: '/playlists' }
    ]

    const allRoutes = shopRoutes.concat(baseRoutes)

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(`${href}/`)

    const navLinkClass = (href: string) =>
        `:uno: rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${isActive(href)
            ? 'text-primary bg-primary/10 border border-primary/30 shadow-glowSm'
            : 'text-muted hover:text-foreground hover:bg-white/5 border border-transparent'
        }`

    return (
        <header id='header' className=':uno: sticky top-0 z-50'>
            <div className=':uno: relative border-b border-white/8'>
                <div className='glass-header-bar :uno: absolute inset-0 pointer-events-none' aria-hidden />
                <div className=':uno: relative container mx-auto px-4 md:px-6'>
                    <nav className=':uno: flex items-center justify-between h-16 md:h-18'>
                        <Link
                            href='/'
                            className=':uno: font-display text-lg md:text-xl font-bold tracking-widest text-foreground hover:text-primary transition-colors duration-200 cursor-pointer'
                        >
                            <SiteLogo />
                        </Link>

                        <ul className=':uno: hidden md:flex items-center gap-1'>
                            <li className=':uno: group relative'>
                                <Link href='/shop' className={navLinkClass('/shop')}>
                                    <span className=':uno: inline-flex items-center gap-1'>
                                        {t('shop_link')}
                                        <AiFillCaretDown className=':uno: h-3 w-3 opacity-60' />
                                    </span>
                                </Link>
                                <div className='glass-frosted :uno: absolute left-0 top-full mt-2 min-w-48 rounded-xl py-2 z-[60] invisible translate-y-1 group-hover:visible group-hover:translate-y-0 transition-[transform,visibility] duration-200'>
                                    {shopRoutes.map(route => (
                                        <Link
                                            key={route.href}
                                            href={route.href}
                                            className=':uno: block px-4 py-2 text-sm text-muted hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer'
                                        >
                                            {route.name}
                                        </Link>
                                    ))}
                                </div>
                            </li>
                            {baseRoutes.map(route => (
                                <li key={route.href}>
                                    <Link href={route.href} className={navLinkClass(route.href)}>
                                        {route.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className=':uno: flex items-center gap-3'>
                            <LangSwitcher />
                            <MobNav routes={allRoutes} />
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}
