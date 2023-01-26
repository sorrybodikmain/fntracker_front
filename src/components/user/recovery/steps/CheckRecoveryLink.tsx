import { FC, PropsWithChildren, useEffect, useState } from 'react'
import RecoveryMessage from '@/components/user/recovery/RecoveryMessage'
import { useSearchParams } from 'react-router-dom'
import PassResetForm from '@/components/user/recovery/steps/PassResetForm'
import { useTranslation } from 'react-i18next'
import EmptyStep from '@/components/user/recovery/steps/EmptyStep'
import { $http } from '@/api/http'

const CheckRecoveryLink: FC<PropsWithChildren<{ hide: boolean }>> = ({ hide }) => {
	const { t } = useTranslation('user-recovery')
	const [searchParams] = useSearchParams()
	const [message, setMessage] = useState<string>('')
	const [error, setError] = useState<string>('')
	const [allowReset, setAllowReset] = useState<boolean>(false)

	useEffect(() => {
		setMessage(t('succ_load')!)
		if (searchParams.get('recid'))
			$http.post('/otp/verify', {
				'otpId': searchParams.get('recid'),
				'userId': searchParams.get('uid'),
				'otp': searchParams.get('otp')
			}).then(() => setMessage(t('succ_link_valid')!)
			)
				.catch(() => {
						setMessage('')
						setError(t('err_link_invalid')!)
					}
				)
	}, [])


	if (!hide) {
		return <EmptyStep title={`${t('step')} 2`} body={t('step2_body')} />
	}

	return (
		<>
			<div className='my-6 bg-gray-600 rounded-md shadow-2xl shadow-blue-800 p-5 text-gray-300'>
				<h1 className='text-gray-200 font-bold text-2xl mb-1'>{t('step')} 2</h1>
				<p className='text-sm font-normal text-gray-300 mb-3'>{t('step2_body')}</p>
				{message ? <RecoveryMessage message={message} color={'bg-green-500'} /> : null}
				{error ? <RecoveryMessage message={error} color={'bg-red-500'} /> : null}

				{!error ?
					<button onClick={() => setAllowReset(true)}
									className='block w-full bg-primary mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white mb-2'>
						{t('butt_next_step')}
					</button> : null}


			</div>
			<PassResetForm hide={allowReset} />
		</>


	)
}

export default CheckRecoveryLink
