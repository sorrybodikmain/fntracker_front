import { FC, useEffect, useState } from 'react'
import { FaInstagram, FaTelegram, FaTwitch, FaTwitter, FaYoutube } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { LinkedAccounts } from '@/types/linked-accounts.type'
import { useUserUpdateSNMutation } from '@/store/api/user.api'
import { toast } from 'react-toastify'
import { useAppDispatch, useTypedSelector } from '@/hooks/useTypedSelector'
import { updateSNData } from '@/store/auth/auth.slice'

const SNEditForm: FC = () => {
	const { t } = useTranslation('user-profile')
	const [accounts, setAccounts] = useState<LinkedAccounts>({} as LinkedAccounts)
	const [updateSN] = useUserUpdateSNMutation()

	const { user } = useTypedSelector(state => state.auth)

	const dispatch = useAppDispatch()

	useEffect(() => {
		if (user?.profile?.socialNetworks)
			setAccounts(user?.profile?.socialNetworks)
	}, [])

	const handleUpdateSN = async (e: any) => {
		e.preventDefault()
		if (user?.isVerified)
			await updateSN(accounts)
				.then(() => {
					toast.success(t('succ_updated'))
					dispatch(updateSNData(accounts))
				})
				.catch(() => toast.success(t('err_updated')))
		else
			toast.error(t('err_updated'))
	}

	return (
		<div className='container text-white mx-auto p-3'>
			<h2 className='border-l-4 border-primary pl-2 mb-4 uppercase'>
				{t('soc_networks_title')}
			</h2>
			<div className='flex flex-wrap bg-gray-600 rounded-lg p-5 hover:scale-[1.01] transition'>
				<form className='text-gray-300 w-full'>
					<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl'>
						<FaInstagram className='h-5 w-5 text-gray-400' />
						<input className=' pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600' type='text'
									 placeholder={t('soc_network_link', { network: 'Instagram' })!}
									 value={accounts.instagram!}
									 onChange={e => setAccounts({ instagram: e.target.value } as LinkedAccounts)}
						/>
					</div>
					<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl '>
						<FaTwitch className='h-4 w-4 text-gray-400' />
						<input className='pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600' type='text'
									 placeholder={t('soc_network_link', { network: 'Twitch' })!}
									 value={accounts.twitch!} onChange={e => setAccounts({ twitch: e.target.value } as LinkedAccounts)}
						/>
					</div>
					<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl '>
						<FaTwitter className='h-4 w-4 text-gray-400' />
						<input className='pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600' type='text'
									 placeholder={t('soc_network_link', { network: 'Twitter' })!}
									 value={accounts.twitter!} onChange={e => setAccounts({ twitter: e.target.value } as LinkedAccounts)}
						/>
					</div>
					<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl '>
						<FaYoutube className='h-4 w-4 text-gray-400' />
						<input className='pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600' type='text'
									 placeholder={t('soc_network_link', { network: 'Youtube' })!}
									 value={accounts.youtube!} onChange={e => setAccounts({ youtube: e.target.value } as LinkedAccounts)}
						/>
					</div>
					<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl '>
						<FaTelegram className='h-4 w-4 text-gray-400' />
						<input className='pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600' type='text'
									 placeholder={t('soc_network_link', { network: 'Telegram' })!}
									 value={accounts.telegram!}
									 onChange={e => setAccounts({ telegram: e.target.value } as LinkedAccounts)}
						/>
					</div>
					<button type='submit'
									onClick={handleUpdateSN}
									className='block w-full bg-primary mt-1 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white mb-2'>
						{t('save_button')}
					</button>

				</form>
			</div>
		</div>
	)
}

export default SNEditForm
