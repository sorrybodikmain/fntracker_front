import { FC, useContext, useEffect, useState } from 'react'
import { FaInstagram, FaTelegram, FaTwitch, FaTwitter, FaYoutube } from 'react-icons/fa'
import { Context } from '../../../index'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const SNEditForm: FC = () => {
	const { t } = useTranslation('user-profile')
	const { store } = useContext(Context)
	const [instLink, setInstLink] = useState<string>('')
	const [twitchLink, setTwitchLink] = useState<string>('')
	const [twitterLink, setTwitterLink] = useState<string>('')
	const [youtubeLink, setYoutubeLink] = useState<string>('')
	const [telegramLink, setTelegramLink] = useState<string>('')
	useEffect(() => {
		setYoutubeLink(store.user.profile?.socialNetworks?.youtube || '')
		setTwitchLink(store.user.profile?.socialNetworks?.twitch || '')
		setTwitterLink(store.user.profile?.socialNetworks?.twitter || '')
		setInstLink(store.user.profile?.socialNetworks?.instagram || '')
		setTelegramLink(store.user.profile?.socialNetworks?.telegram || '')
	}, [])
	const saveSN = async (e: any) => {
		e.preventDefault()
		await store.updateSocialNetworks(youtubeLink, twitchLink, instLink, twitterLink, telegramLink)
			.then(() => toast.success(t('succ_updated')))
			.catch(() => toast.success(t('err_updated')))
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
									 value={instLink} onChange={e => setInstLink(e.target.value)}
						/>
					</div>
					<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl '>
						<FaTwitch className='h-4 w-4 text-gray-400' />
						<input className='pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600' type='text'
									 placeholder={t('soc_network_link', { network: 'Twitch' })!}
									 value={twitchLink} onChange={e => setTwitchLink(e.target.value)}
						/>
					</div>
					<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl '>
						<FaTwitter className='h-4 w-4 text-gray-400' />
						<input className='pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600' type='text'
									 placeholder={t('soc_network_link', { network: 'Twitter' })!}
									 value={twitterLink} onChange={e => setTwitterLink(e.target.value)}
						/>
					</div>
					<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl '>
						<FaYoutube className='h-4 w-4 text-gray-400' />
						<input className='pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600' type='text'
									 placeholder={t('soc_network_link', { network: 'Youtube' })!}
									 value={youtubeLink} onChange={e => setYoutubeLink(e.target.value)}
						/>
					</div>
					<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl '>
						<FaTelegram className='h-4 w-4 text-gray-400' />
						<input className='pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600' type='text'
									 placeholder={t('soc_network_link', { network: 'Telegram' })!}
									 value={telegramLink} onChange={e => setTelegramLink(e.target.value)}
						/>
					</div>
					<button type='submit'
									onClick={saveSN}
									className='block w-full bg-primary mt-1 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white mb-2'>
						{t('save_button')}
					</button>

				</form>
			</div>
		</div>
	)
}

export default SNEditForm
