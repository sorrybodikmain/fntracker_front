import {FC} from 'react'
import {VscAccount} from 'react-icons/vsc'
import {Popover} from '@headlessui/react'
import { Link } from 'react-router-dom'

const Profile: FC = () => {
	const user ={
		email: 'string',
		egsName: 'string',
		linkedAccounts:  null,
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
					<VscAccount/>
				</Popover.Button>
				<Popover.Panel className='fixed z-50 bg-gray-800 px-2 py-2 rounded-lg -mx-20'>
					<div className='grid grid-col text-xs'>
						{user?.isLoggedIn === true ? (
							<>
								<Link to={'/favorite'} className='border-b-2 border-gray-500'>My favorite</Link>
								<Link to={'/search/' + user.egsName} className='border-b-2 border-gray-500'>Track me
									down</Link>
								<Link to={'/user/profile'} className='border-b-2 border-gray-500'>Profile</Link>
								<Link to={'/api/user/logout'} onClick={handleLogout}>
									Logout
								</Link>
							</>
						) : (
							<>
								<Link to='/auth/login' className='border-b-2 border-gray-500'>Sign in</Link>
								<Link to='/auth/register'>Sign up</Link>
							</>
						)}
					</div>
				</Popover.Panel>
			</Popover>
		</>
	)
}

export default Profile
