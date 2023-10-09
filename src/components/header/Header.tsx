import { FC } from 'react'
import { Link } from 'react-router-dom'
import LangSwitcher from './LangSwitcher'
import MobNav from './MobNav'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import { AiFillCaretDown } from 'react-icons/ai'

const Header: FC = () => {
	const { t } = useTranslation('header')
	const shopRoutes = [
		{
			name: t('shop_link'),
			href: '/shop'
		},
		{
			name: t('upcoming_title'),
			href: '/upcoming-items/'
		},
		{
			name: t('allitems_title'),
			href: '/all-items/'
		}
	]
	const baseRoutes = [
		{
			name: t('bp_title'),
			href: '/battle-pass/current'
		},
		{
			name: t('maps_link'),
			href: '/compare-maps'
		}
	]
	const location = useLocation()
	return (
		<>
			<section id='header'>
				<div className=':uno: bg-gray-900 shadow-lg py-5 px-7 sticky top-0 z-50'>
					<div className=':uno: container mx-auto'>
						<nav className=':uno: flex justify-between'>
							<div className=':uno: flex items-center space-x-3 lg:pr-16 pr-6'>
								<Link to='/' className=':uno: text-white text-base'>
									FNTracker
								</Link>
							</div>

							<ul className=':uno: hidden md:flex items-center space-x-2'>
								<div className=':uno: group inline-block relative'>
									<Link
										to='/shop'
										className=':uno: text-gray-500 py-2 inline-flex items-center'
									>
										<span className=':uno: mr-1'>{t('shop_link')}</span>
										<AiFillCaretDown className=':uno: fill-current h-4 w-4' />
									</Link>
									<ul className=':uno: absolute hidden rounded bg-gray-700 text-gray-300 group-hover:block'>
										{shopRoutes.map((router, index) => (
											<li key={index}>
												<Link
													className=':uno:  hover:bg-gray-600 py-1.5 px-4 block w-28'
													to={router.href}
												>
													{router.name}
												</Link>
											</li>
										))}
									</ul>
								</div>

								{baseRoutes.map((router, index) => (
									<li key={index}>
										<Link
											to={router.href}
											className={`block hover:text-gray-300 py-1 md:mx-1 ${
												location.pathname === router.href
													? 'underline text-gray-200'
													: 'text-gray-500'
											}`}
										>
											{router.name}
										</Link>
									</li>
								))}
							</ul>
							<div className=':uno: text-white flex space-x-2 justify-center items-center pl-2'>
								<LangSwitcher />
								<MobNav routes={shopRoutes.concat(baseRoutes)} />
							</div>
						</nav>
					</div>
				</div>
			</section>
		</>
	)
}

export default Header
