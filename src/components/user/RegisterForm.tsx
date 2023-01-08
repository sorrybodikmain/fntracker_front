import { FC, useContext, useState } from 'react'
import { Context } from '../../index'
import { FaAt, FaFlag, FaLock } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { SiEpicgames } from 'react-icons/si'
import countries from '@/data/countries.json'
import { useTranslation } from 'react-i18next'

const RegisterForm: FC = () => {
	const { t } = useTranslation('user-auth')
	const [email, setEmail] = useState<string>('')
	const [nickName, setNickName] = useState<string>('')
	const [country, setCountry] = useState<string>('UA')
	const [password, setPassword] = useState<string>('')

	const registration = (e: any) => {
		e.preventDefault()
		const res = store.registration(email, password, nickName, country.toLowerCase())
		console.log(res)
	}
	const { store } = useContext(Context)
	return (
		<>
			<div className='flex max-w-[1920px] mx-auto'>
				<div
					className='hidden lg:flex w-full lg:w-1/2 justify-around items-center bg-gradient-to-bl from-blue-800 to-black hover:to-blue-900'>
					<div className=' w-full mx-auto px-20 flex-col items-center space-y-6'>
						<h1 className='text-white font-bold text-4xl font-sans'>FNTracker {t('registration')}</h1>
						<p className='text-white mt-1'>{t('auth_body')}</p>
					</div>
				</div>

				<div className='flex w-full lg:w-1/2 justify-center items-center bg-gray-900 space-y-8'>
					<div className='w-full px-8 md:px-32 lg:px-24'>
						<form className='bg-gray-600 rounded-md shadow-2xl shadow-blue-800 p-5 text-gray-300'>
							<h1 className='text-gray-200 font-bold text-2xl mb-1'>{t('registration_form_title')}</h1>
							<p className='text-sm font-normal text-gray-300 mb-8'>{t('registration_form_body')}</p>
							<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl'>
								<FaAt className='h-5 w-5 text-gray-400' />
								<input className=' pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600' type='email'
											 placeholder={t('email_placeholder')!} value={email} onChange={e => setEmail(e.target.value)} />
							</div>
							<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl'>
								<SiEpicgames className='h-5 w-5 text-gray-400' />
								<input className=' pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600' type='text'
											 placeholder={t('egsid_placeholder')!} value={nickName} onChange={e => setNickName(e.target.value)} />
							</div>
							<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl'>
								<FaFlag className='h-5 w-5 text-gray-400' />
								<select className=' pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600'
												value={country} onChange={e => setCountry(e.target.value)}
								>
									{countries.map(
										(item, index) => (
											<option key={index} value={item.code}>{item.name}</option>
										))}
								</select>
							</div>
							<div className='flex items-center border-2 mb-12 py-2 px-3 rounded-2xl '>
								<FaLock className='h-4 w-4 text-gray-400' />
								<input className='pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600' type='password'
											 placeholder={t('pass_placeholder')!} value={password} onChange={e => setPassword(e.target.value)} />
							</div>
							<button type='submit' onClick={registration}
											className='block w-full bg-primary mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white mb-2'>
								{t('registration')}
							</button>
							<div className='flex justify-between mt-4 text-gray-300'>
								<Link to='/user/recovery'
											className='text-sm ml-2 hover:text-primary hover:-translate-y-1 transition-all'>
									{t('forgot_pass_link')}
								</Link>

								<Link to='/user/login'
											className='text-sm ml-2 hover:text-primary hover:-translate-y-1 transition-all'>
									{t('have_acc_link')}
								</Link>
							</div>

						</form>
					</div>
				</div>


			</div>
		</>
	)
}

export default RegisterForm
