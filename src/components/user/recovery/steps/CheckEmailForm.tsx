import { FC, PropsWithChildren, useState } from 'react'
import { FaAt } from 'react-icons/fa'
import RecoveryMessage from '@/components/user/recovery/RecoveryMessage'
import httpClient from '@/http/index'
import { useTranslation } from 'react-i18next'
import EmptyStep from '@/components/user/recovery/steps/EmptyStep'

const CheckEmailForm: FC<PropsWithChildren<{ hide: boolean }>> = ({ hide }) => {
	const { t } = useTranslation('user-recovery')
	const [email, setEmail] = useState<string>('')
	const [message, setMessage] = useState<string>('')
	const [error, setError] = useState<string>('')
	const [showButton, setShowButton] = useState<boolean>(true)
	const sendEmail = async (e: any) => {
		setMessage(t('succ_load')!)
		e.preventDefault()
		await httpClient.get('/mail/sd/recovery?email=' + email)
			.then(() => {
				setMessage(t('succ_send_mail')!)
				setShowButton(false)
			})
			.catch(() => {
				setMessage('')
				setError(t('err_email_not_found')!)
			})

	}

	if (!hide) {
		return <EmptyStep title={`${t('step')} 1`} body={t('step1_body')} />
	}

	return (
		<form className='my-6 bg-gray-600 rounded-md shadow-2xl shadow-blue-800 p-5 text-gray-300'>
			<h1 className='text-gray-200 font-bold text-2xl mb-1'>{t('step')} 1</h1>
			<p className='text-sm font-normal text-gray-300 mb-3'>{t('step1_body')}</p>

			<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl'>
				<FaAt className='h-5 w-5 text-gray-400' />
				<input className=' pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600' type='email'
							 placeholder={t('step1_body')!} value={email} onChange={e => setEmail(e.target.value)} />
			</div>
			{message ? <RecoveryMessage message={message} color={'bg-green-500'} /> : null}
			{error ? <RecoveryMessage message={error} color={'bg-red-500'} /> : null}
			{showButton ?
				<button type='submit'
								onClick={sendEmail}
								className='block w-full bg-primary mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white mb-2'>
					{t('butt_send_mail')}
				</button> : null}

		</form>
	)
}

export default CheckEmailForm
