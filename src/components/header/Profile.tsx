import { FC } from 'react'
import { VscAccount } from 'react-icons/vsc'
import { Popover } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

const Profile: FC = () => {
	const { t } = useTranslation('header')

	const {logout} = useActions()
	const {accessToken} = useAuth()

	const handleLogout = async () => await logout(accessToken)
	return (
		<>
			<Popover>
				<Popover.Button className='py-2 outline-none'>
					<VscAccount />
				</Popover.Button>
				<Popover.Panel className='fixed z-50 bg-gray-800 px-2 py-2 rounded-lg -mx-20'>
					<div className='grid grid-col text-xs text-gray-400'>
						{accessToken ? (
							<>
								<Link to='/user/favorite'
											className='hover:text-gray-300'>
									{t('favorite_link')}</Link>
								<Link to='/user/profile'
											className='hover:text-gray-300'>
									{t('profile_link')}</Link>
								<Link to='/user/login' className='hover:text-gray-300'
											onClick={handleLogout}>
									{t('exit_link')}</Link>
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
