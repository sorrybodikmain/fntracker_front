'use client'

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiMenuAlt3 } from 'react-icons/hi'

interface Route {
	name: string
	href: string
}

interface MobNavProps {
	routes: Route[]
}

export function MobNav({ routes }: MobNavProps) {
	const pathname = usePathname()

	return (
		<Popover className=':uno: md:hidden'>
			<Popover.Button
				className=':uno: flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-surface text-foreground hover:border-primary/30 hover:text-primary transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary'
				aria-label='Open menu'
			>
				<HiMenuAlt3 className=':uno: w-5 h-5' />
			</Popover.Button>

			<Transition
				as={Fragment}
				enter=':uno: transition ease-out duration-200'
				enterFrom=':uno: opacity-0 translate-x-4'
				enterTo=':uno: opacity-100 translate-x-0'
				leave=':uno: transition ease-in duration-150'
				leaveFrom=':uno: opacity-100 translate-x-0'
				leaveTo=':uno: opacity-0 translate-x-4'
			>
				<Popover.Panel className=':uno: fixed inset-y-0 right-0 z-50 w-72 max-w-[85vw] border-l border-white/10 bg-void/95 backdrop-blur-xl shadow-glass pt-20 px-4 pb-8'>
					<ul className=':uno: flex flex-col gap-1'>
						{routes.map(route => {
							const active =
								pathname === route.href ||
								pathname.startsWith(`${route.href}/`)
							return (
								<li key={route.href}>
									<Link
										href={route.href}
										className={`:uno: block rounded-lg px-4 py-3 text-sm font-medium transition-all cursor-pointer ${active
												? 'text-primary bg-primary/10 border border-primary/30'
												: 'text-muted hover:text-foreground hover:bg-white/5 border border-transparent'
											}`}
									>
										{route.name}
									</Link>
								</li>
							)
						})}
					</ul>
				</Popover.Panel>
			</Transition>
		</Popover>
	)
}
