import { FC, PropsWithChildren, useState } from 'react'
import { FaLock } from 'react-icons/fa'
import RecoveryMessage from '@/components/user/recovery/RecoveryMessage'
import httpClient from '@/http/index'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router'

const PassResetForm: FC<PropsWithChildren<{ hide: boolean }>> = ({ hide }) => {
	const [searchParams] = useSearchParams()
	const [password, setPassword] = useState<string>('')
	const [passRepeat, setPassRepeat] = useState<string>('')
	const [message, setMessage] = useState<string>('')
	const [error, setError] = useState<string>('')
	const navigate = useNavigate()

	if (!hide) {
		return (
			<div
				className='my-6 bg-gray-600 rounded-md shadow-2xl shadow-blue-800 p-5 text-gray-300  hover:-translate-y-1 transition-all'>
				<h1 className='text-gray-200 font-bold text-2xl mb-1'>Step 3</h1>
				<p className='text-sm font-normal text-gray-300 mb-3'>Enter your password</p>
			</div>
		)
	}
	const resetPassword = async (e: any) => {
		e.preventDefault()
		if (password !== passRepeat) {
			setMessage('')
			setError('Passwords do not match!')
		} else {
			setError('')
			await httpClient.post('/auth/recovery', {
				'uid': searchParams.get('uid'),
				'otp': searchParams.get('otp'),
				'password': password,
				'email': searchParams.get('mail'),
				'recid': searchParams.get('recid')
			}).then(() => {
				setMessage('Password successfully changed!Forwarding in 5 seconds.')
				setTimeout(()=>{
					navigate('/user/login')
				}, 5000)
			}).catch(() => {
				setError('Something went wrong!')
			})

		}
	}


	return (
		<form className='my-6 bg-gray-600 rounded-md shadow-2xl shadow-blue-800 p-5 text-gray-300'>
			<h1 className='text-gray-200 font-bold text-2xl mb-1'>Step 3</h1>
			<p className='text-sm font-normal text-gray-300 mb-3'>Enter your password</p>

			<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl'>
				<FaLock className='h-5 w-5 text-gray-400' />
				<input className=' pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600' type='password'
							 placeholder='Your Password' value={password} onChange={e => setPassword(e.target.value)} />
			</div>
			<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl'>
				<FaLock className='h-5 w-5 text-gray-400' />
				<input className=' pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600' type='password'
							 placeholder='Your Repeat Password' value={passRepeat} onChange={e => setPassRepeat(e.target.value)} />
			</div>
			{
				message ?
					<RecoveryMessage message={message} color={'bg-green-500'} />
					: null
			}
			{
				error ?
					<RecoveryMessage message={error} color={'bg-red-500'} />
					: null
			}

			<button type='submit'
							onClick={resetPassword}
							className='block w-full bg-primary mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white mb-2'>
				Check
			</button>

		</form>
	)
}

export default PassResetForm
