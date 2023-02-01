import { FC, PropsWithChildren, useState } from 'react'
import { FaLock } from 'react-icons/fa'
import RecoveryMessage from '@/components/user/recovery/RecoveryMessage'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import EmptyStep from '@/components/user/recovery/steps/EmptyStep'
import { useTranslation } from 'react-i18next'
import { $http } from '@/api/http'

const PassResetForm: FC<PropsWithChildren<{ hide: boolean }>> = ({ hide }) => {
	const { t } = useTranslation('user-recovery')
	const [searchParams] = useSearchParams()
	const [password, setPassword] = useState<string>('')
	const [passRepeat, setPassRepeat] = useState<string>('')
	const [message, setMessage] = useState<string>('')
	const [error, setError] = useState<string>('')
	const navigate = useNavigate()

	const resetPassword = async (e: any) => {
		e.preventDefault()
		if (password !== passRepeat) {
			setMessage('')
			setError(t('err_pass_not_match')!)
		} else {
			setMessage(t('succ_load')!)
			setError('')
			await $http.post('/auth/recovery', {
				'uid': searchParams.get('uid'),
				'otp': searchParams.get('otp'),
				'password': password,
				'email': searchParams.get('mail'),
				'recid': searchParams.get('recid')
			}).then(() => {
				setMessage(t('succ_pass_changed')!)
				setTimeout(() => {
					navigate('/user/login')
				}, 5000)
			}).catch(() => {
				setError(t('err_wrong')!)
			})

		}
	}
	if (!hide) {
		return <EmptyStep title={`${t('step')} 3`} body={t('step3_body')} />
	}


	return (
		<form className='my-6 bg-gray-600 rounded-md shadow-2xl shadow-blue-800 p-5 text-gray-300'>
			<h1 className='text-gray-200 font-bold text-2xl mb-1'>{t('step')} 3</h1>
			<p className='text-sm font-normal text-gray-300 mb-3'>{t('step3_body')}</p>

			<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl'>
				<FaLock className='h-5 w-5 text-gray-400' />
				<input className=' pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600' type='password'
							 placeholder={t('step3_body')!} value={password} onChange={e => setPassword(e.target.value)} />
			</div>
			<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl'>
				<FaLock className='h-5 w-5 text-gray-400' />
				<input className=' pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600' type='password'
							 placeholder={t('step3_body')!} value={passRepeat} onChange={e => setPassRepeat(e.target.value)} />
			</div>
			{message ? <RecoveryMessage message={message} color={'bg-green-500'} /> : null}
			{error ? <RecoveryMessage message={error} color={'bg-red-500'} /> : null}
			<button type='submit'
							onClick={resetPassword}
							className='block w-full bg-primary mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white mb-2'>
				{t('butt_change_pass')}
			</button>

		</form>
	)
}

export default PassResetForm
