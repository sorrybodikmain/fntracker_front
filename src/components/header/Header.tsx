import { FC } from 'react'
import { Link } from 'react-router-dom'
import LangSwitcher from './LangSwitcher'
import MobNav from './MobNav'
import Profile from './Profile'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'

const Header: FC = () => {
	const { t } = useTranslation('header')
	const routes = [
		{
			name: t('home_link'),
			href: '/'
		},
		{
			name: t('shop_link'),
			href: '/shop'
		},
		{
			name: t('upcoming_title'),
			href: '/upcoming-items/'
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
				<div className='bg-gray-900 shadow-lg py-5 px-7 sticky top-0 z-50'>
					<div className='container mx-auto'>
						<nav className='flex justify-between'>
							<div className='flex items-center space-x-3 lg:pr-16 pr-6'>
								<Link to='/' className='text-white text-base'>
									FNTracker
								</Link>
							</div>
							<ul className='hidden md:flex items-center space-x-2'>
								{routes.map((router, index) => (
									<li key={index}>
										<Link
											to={router.href}
											className={
												`block hover:text-gray-300 py-1 md:mx-1 ${
													location.pathname === router.href ? 'underline text-gray-200'
														: 'text-gray-500'
												}`
											}
										>
											{router.name}
										</Link>
									</li>
								))}
							</ul>
							<div className='text-white flex space-x-2 justify-center items-center pl-2'>
								<LangSwitcher />
								<MobNav routes={routes} />
								<Profile />
							</div>
						</nav>
					</div>
				</div>
			</section>
		</>
	)
}

export default Header
