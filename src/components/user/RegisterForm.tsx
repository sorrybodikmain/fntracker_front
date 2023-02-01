import { FC, useState } from 'react'
import { FaAt, FaFlag, FaLock } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { SiEpicgames } from 'react-icons/si'
import countries from '@/data/countries.json'
import { useTranslation } from 'react-i18next'
import { fetcher } from '@/libs/apiFetcher'
import { AccountIdResponse } from '@/types/user-stats.type'
import { useActions } from '@/hooks/useActions'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const RegisterForm: FC = () => {
	const { t } = useTranslation('user-auth')
	const { register } = useActions()
	const navigate = useNavigate()

	const [email, setEmail] = useState<string>('')
	const [nickName, setNickName] = useState<string>('')
	const [country, setCountry] = useState<string>('UA')
	const [password, setPassword] = useState<string>('')


	const registration = async (e: any) => {
		e.preventDefault()
		await fetcher('https://fortniteapi.io/v1/lookup?username=' + nickName)
			.then((res: AccountIdResponse) => {
				if (res.account_id) {
					try {
						register({
							email,
							password,
							egsId: res.account_id,
							country: country.toLowerCase()
						})
						toast.success(t('succ_register')!)
						setTimeout(() => navigate('/user/profile'), 1000)
					} catch (e: any) {
						toast.error(e.data.message || t('err_wrong')!)
					}
				} else
					toast.error(t('egs_not_found')!)
			})
	}
	return (
		<>
			<div className='min-h-[81.1vh] flex max-w-[1920px] mx-auto'>
				<div
					className='hidden lg:flex w-full lg:w-1/2 justify-around items-center bg-gradient-to-bl from-blue-800 to-black hover:to-blue-900'>
					<div className=' w-full mx-auto px-20 flex-col items-center space-y-6'>
						<h1 className='text-white font-bold text-4xl font-sans'>FNTracker {t('registration')}</h1>
						<p className='text-white mt-1'>{t('auth_body')}</p>
					</div>
				</div>

				<div className='flex w-full lg:w-1/2 justify-center items-center bg-gray-900 space-y-8'>
					<div className='w-full px-8 md:px-32 lg:px-24'>
						<form className='bg-gray-600 rounded-md shadow-2xl shadow-blue-800 p-5 text-gray-300'
									onSubmit={registration}
						>
							<h1 className='text-gray-200 font-bold text-2xl mb-1'>{t('registration_form_title')}</h1>
							<p className='text-sm font-normal text-gray-300 mb-8'>{t('registration_form_body')}</p>
							<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl'>
								<FaAt className='h-5 w-5 text-gray-400' />
								<input className=' pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600'
											 type='email'
											 placeholder={t('email_placeholder')!}
											 value={email} onChange={e => setEmail(e.target.value)}
								/>
							</div>
							<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl'>
								<SiEpicgames className='h-5 w-5 text-gray-400' />
								<input className=' pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600'
											 type='text'
											 placeholder={t('egsId_placeholder')!}
											 value={nickName}
											 autoComplete='off'
											 onChange={e => setNickName(e.target.value)}
								/>
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
							<div className='flex items-center border-2 mb-6 py-2 px-3 rounded-2xl'>
								<FaLock className='h-4 w-4 text-gray-400' />
								<input className='pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600'
											 type='password'
											 placeholder={t('pass_placeholder')!} value={password}
											 onChange={e => setPassword(e.target.value)}
											 autoComplete='new-password'
								/>
							</div>
							<button type='submit'
											className='block w-full bg-primary hover:bg-indigo-700 hover:-translate-y-1 mt-5 py-2 rounded-2xl transition-all duration-500 text-white mb-2'>
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
