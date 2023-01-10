import { FC, useContext, useEffect, useState } from 'react'
import { FaFlag, FaRegAddressBook, FaUserCircle } from 'react-icons/fa'
import countries from '@/data/countries.json'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Context } from '../../../index'

const ProfileEditForm: FC = () => {
	const { store } = useContext(Context)
	const { t } = useTranslation('user-profile')
	const [country, setCountry] = useState<string>('UA')
	const [realName, setRealName] = useState<string>('')
	const [avatar, setAvatar] = useState<string>('')

	const saveProfile = async (e: any) => {
		e.preventDefault()
		await store.updateProfile(country.toLowerCase(), avatar, realName)
			.then(() => toast.success(t('succ_updated')))
			.catch(() => toast.success(t('err_updated')))
	}
	useEffect(() => {
		setAvatar(store.user.profile?.avatar || '')
		setRealName(store.user.profile?.fullName || '')
		setCountry(store.user.profile?.country.toUpperCase() || '')
	}, [])

	return (
		<div className='container text-white mx-auto p-3'>
			<h2 className='border-l-4 border-primary pl-2 mb-4 uppercase'>
				{t('profile_update_title')}
			</h2>
			<div className='flex flex-wrap bg-gray-600 rounded-lg p-5 hover:scale-[1.01] transition'>
				<form className='text-gray-300 w-full'>
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
					<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl'>
						<FaUserCircle className='h-5 w-5 text-gray-400' />
						<input className=' pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600' type='text'
									 placeholder={'Paste link to your avatar'}
									 value={avatar} onChange={e => setAvatar(e.target.value)}
						/>
					</div>
					<div className='flex items-center border-2 mb-8 py-2 px-3 rounded-2xl '>
						<FaRegAddressBook className='h-4 w-4 text-gray-400' />
						<input className='pl-2 w-full outline-none border-none bg-gray-600 focus:bg-gray-600' type='text'
									 placeholder={'Your full name'}
									 value={realName} onChange={e => setRealName(e.target.value)}
						/>
					</div>
					<button type='submit'
									onClick={saveProfile}
									className='block w-full bg-primary mt-1 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white mb-2'>
						{t('save_button')}
					</button>

				</form>
			</div>
		</div>
	)
}

export default ProfileEditForm
