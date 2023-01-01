import { FC } from 'react'
import { VscAccount } from 'react-icons/vsc'
import { Popover } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Profile: FC = () => {
	const { t } = useTranslation('header')
	const user = {
		email: 'string',
		egsName: 'string',
		linkedAccounts: null,
		subscriptions: null,
		isLoggedIn: true
	}
	const handleLogout = async (e: any) => {
		e.preventDefault()
	}
	return (
		<>
			<Popover>
				<Popover.Button className='py-2'>
					<VscAccount />
				</Popover.Button>
				<Popover.Panel className='fixed z-50 bg-gray-800 px-2 py-2 rounded-lg -mx-20'>
					<div className='grid grid-col text-xs'>
						{user?.isLoggedIn === true ? (
							<>
								<Link to={'/favorite'} className='border-b-2 border-gray-500'>{t('favorite_link')}</Link>
								<Link to={'/search/' + user.egsName} className='border-b-2 border-gray-500'>{t('track_link')}</Link>
								<Link to={'/user/profile'} className='border-b-2 border-gray-500'>{t('profile_link')}</Link>
								<Link to={'/api/user/logout'} onClick={handleLogout}>{t('exit_link')}</Link>
							</>
						) : (
							<>
								<Link to='/auth/login' className='border-b-2 border-gray-500'>{t('signin_link')}{t('exit_link')}</Link>
								<Link to='/auth/register'>{t('favorite_link')}{t('signup_link')}</Link>
							</>
						)}
					</div>
				</Popover.Panel>
			</Popover>
		</>
	)
}

export default Profile
