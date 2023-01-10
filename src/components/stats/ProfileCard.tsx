import { FC, PropsWithChildren } from 'react'
import { BsFillEyeFill, BsInstagram, BsTelegram, BsTwitch, BsTwitter, BsYoutube } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'
import { ProfileType } from '@/api/types/profile.type'

const ProfileCard: FC<PropsWithChildren<{
	profileData: ProfileType,
	nickname?: string,
	views?: number
}>> = ({
				 profileData,
				 nickname,
				 views
			 }) => {

	const { t } = useTranslation('stats')
	return (
		<div className='container text-white mx-auto p-3'>
			<h2 className='border-l-4 border-primary pl-2 mb-4'>
				{ t('profile_card_title').toUpperCase()}
			</h2>
			<div
				className={`flex flex-wrap rounded-lg p-3 hover:scale-[1.01] transition bg-gradient-to-r from-purple-900 to-cyan-900`}>
				<div className='w-full md:w-3/12 mb-3 md:mb-0 mx-auto'>
					<div className='relative bg-cover'>
						<img
							src={`/images/flags/${profileData?.country || 'ua'}.svg`}
							alt={'country-image'}
							className='rounded w-10 absolute bottom-0 left-0'
						/>
						<img
							src={profileData?.avatar || '/images/default-avatar.webp'}
							alt={'avatar-image'}
							className='object-cover rounded-full w-32'
						/>
					</div>
				</div>

				<div className='relative w-full md:w-9/12 xl:w-7/12 px-3 mb-4 md:mb-0 mr-auto text-gray-500'>
					<h2 className='text-2xl mb-1 text-white gap-x-2 flex'>
						{nickname || 'Your nickname'}
						<p className='text-sm mt-3'>{profileData?.fullName || ''}</p>
					</h2>

					{
						profileData?.socialNetworks ?
							<ul className='flex text-white gap-x-2'>
								{profileData.socialNetworks.youtube ?
									<li className='bg-gray-700 rounded-full mb-1 w-8 h-8 p-2 hover:bg-red-500'>
										<a href={`https://www.youtube.com/${profileData.socialNetworks.youtube}`}>
											<BsYoutube />
										</a>
									</li>
									: null
								}
								{profileData.socialNetworks.twitch ?
									<li className='bg-gray-700 rounded-full mb-1 w-8 h-8 p-2 hover:bg-purple-500'>
										<a href={profileData.socialNetworks.twitch}>
											<BsTwitch />
										</a>
									</li>
									: null
								}
								{profileData.socialNetworks.twitter ?
									<li className='bg-gray-700 rounded-full mb-1 w-8 h-8 p-2 hover:bg-blue-500'>
										<a href={profileData.socialNetworks.twitter}>
											<BsTwitter />
										</a>
									</li>
									: null
								}
								{profileData.socialNetworks.instagram ?
									<li className='bg-gray-700 rounded-full mb-1 w-8 h-8 p-2 hover:bg-yellow-500'>
										<a href={profileData.socialNetworks.instagram}>
											<BsInstagram />
										</a>
									</li>
									: null
								}
								{profileData.socialNetworks.telegram ?
									<li className='bg-gray-700 rounded-full mb-1 w-8 h-8 p-2 hover:bg-blue-500'>
										<a href={profileData.socialNetworks.telegram}>
											<BsTelegram />
										</a>
									</li>
									: null
								}
							</ul> : null
					}
					<div className='relative md:absolute bottom-0'>
						<p className='flex flex gap-x-2'>
							<BsFillEyeFill className='mt-1' /> {views || 1} {t('profile_card_views')}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfileCard
