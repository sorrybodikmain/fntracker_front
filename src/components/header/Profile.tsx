import { FC, useContext } from 'react'
import { VscAccount } from 'react-icons/vsc'
import { Popover } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Context } from '../../index'

const Profile: FC = () => {
	const { store } = useContext(Context)
	const { t } = useTranslation('header')
	const handleLogout = async () => await store.logout()
	return (
		<>
			<Popover>
				<Popover.Button className='py-2'>
					<VscAccount />
				</Popover.Button>
				<Popover.Panel className='fixed z-50 bg-gray-800 px-2 py-2 rounded-lg -mx-20'>
					<div className='grid grid-col text-xs'>
						{store.isAuth ? (
							<>
								<Link to={'/favorite'} className='border-b-2 border-gray-500'>{t('favorite_link')}</Link>
								<Link to={'/user/profile'} className='border-b-2 border-gray-500'>{t('profile_link')}</Link>
								<button onClick={handleLogout}>{t('exit_link')}</button>
							</>
						) : (
							<>
								<Link to='/user/login' className='border-b-2 border-gray-500'>{t('signin_link')}</Link>
								<Link to='/user/register'>{t('signup_link')}</Link>
							</>
						)}
					</div>
				</Popover.Panel>
			</Popover>
		</>
	)
}

export default Profile
