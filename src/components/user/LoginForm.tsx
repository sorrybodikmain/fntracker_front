import { FC, useContext, useState } from 'react'
import { Context } from '../../index'
import { FaAt, FaLock } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import RecoveryMessage from '@/components/user/recovery/RecoveryMessage'

const LoginForm: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string>('')
	const navigate = useNavigate()
	const handleLogin = (e: any) => {
		e.preventDefault()
		store.login(email, password).then(() => {
			setError('')
			navigate('/user/profile')
		}).catch(() => {
			setError('Something went wrong!')
		})
	}
	const { store } = useContext(Context)
	return (
		<>
			<div className='h-[81.1vh] flex'>
				<div
					className='hidden lg:flex w-full lg:w-1/2 justify-around items-center bg-gradient-to-bl from-blue-800 to-black'>
					<div className=' w-full mx-auto px-20 flex-col items-center space-y-6'>
						<h1 className='text-white font-bold text-4xl font-sans'>FNTracker Login</h1>
						<p className='text-white mt-1'>Fortnite Stats, Leaderboards, Item Shop,<br /> Track Item in shop and more!
						</p>
					</div>
				</div>
				<div className='flex w-full lg:w-1/2 justify-center items-center bg-gray-900 space-y-8'>
					<div className='w-full px-8 md:px-32 lg:px-24'>
						<form className='bg-gray-600 rounded-md shadow-2xl shadow-blue-800 p-5 text-gray-300'>
							<h1 className='text-gray-200 font-bold text-2xl mb-1'>Hello Again!</h1>
							<p className='text-sm font-normal text-gray-300 mb-8'>Welcome Back!</p>
							<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl'>
								<FaAt className='h-5 w-5 text-gray-400' />
								<input className=' pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600' type='email'
											 placeholder='Your Email Address' value={email} onChange={e => setEmail(e.target.value)}  required/>
							</div>
							<div className='flex items-center border-2 mb-12 py-2 px-3 rounded-2xl '>
								<FaLock className='h-4 w-4 text-gray-400' />
								<input className='pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600' type='password'
											 placeholder='Your Password' value={password} onChange={e => setPassword(e.target.value)} required/>
							</div>
							{error ? <RecoveryMessage message={error} color={'bg-red-500'} /> : null}
							<button type='submit' onClick={handleLogin}
											className='block w-full bg-primary mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white mb-2'>Login
							</button>
							<div className='flex justify-between mt-4 text-gray-300'>
								<Link to='/user/recovery'
											className='text-sm ml-2 hover:text-primary hover:-translate-y-1 transition-all'>
									Forgot Password ?
								</Link>

								<Link to='/user/register'
											className='text-sm ml-2 hover:text-primary hover:-translate-y-1 transition-all'>
									Dont have an account yet?
								</Link>
							</div>

						</form>
					</div>

				</div>
			</div>
		</>
	)
}

export default LoginForm
