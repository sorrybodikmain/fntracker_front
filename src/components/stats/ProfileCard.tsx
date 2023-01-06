import { FC, PropsWithChildren } from 'react'
import { AccountStatsResponse, ProfileResponse } from '@/api/types/user-stats.type'
import { BsFillEyeFill, BsInstagram, BsTwitch, BsTwitter, BsYoutube } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const ProfileCard: FC<PropsWithChildren<{ data: AccountStatsResponse, profile: ProfileResponse }>> = ({
																																																				data,
																																																				profile
																																																			}) => {
	const { t } = useTranslation('stats')
	const { nickname } = useParams()

	return (
		<div className='container text-white mx-auto p-3'>
			<h2 className='border-l-4 border-primary pl-2 mb-4'>
				{t('profile_card_title').toUpperCase()}
			</h2>
			<div className='flex flex-wrap bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition'>
				<div className='w-full md:w-3/12 mb-3 md:mb-0 mx-auto'>
					<div className='relative bg-cover'>
						<img
							src={`/images/flags/${profile?.country || 'ua'}.svg`}
							alt={'country-image'}
							className='rounded w-10 absolute bottom-0 left-0'
						/>
						<img
							src={profile?.avatar || '/images/preloader.gif'}
							alt={'icon-image'}
							className='object-cover rounded-full w-32'
						/>
					</div>
				</div>

				<div className='relative w-full md:w-9/12 xl:w-7/12 px-3 mb-4 md:mb-0 mr-auto text-gray-500'>
					<h2 className='text-2xl mb-1 text-white flex gap-x-2'>
						{data?.name}
						<p className='text-sm mt-3'>{profile?.fullName}</p>
					</h2>
					<ul className='flex text-white gap-x-2'>
						<li className='bg-gray-700 rounded-full mb-1 w-8 h-8 p-2 hover:bg-red-500'>
							<a href='https://www.youtube.com/channel/'>
								<BsYoutube />
							</a>
						</li>
						<li className='bg-gray-700 rounded-full mb-1 w-8 h-8 p-2 hover:bg-purple-500'>
							<a href='https://www.twitch.tv/'>
								<BsTwitch />
							</a>
						</li>
						<li className='bg-gray-700 rounded-full mb-1 w-8 h-8 p-2 hover:bg-blue-500'>
							<a href='https://twitter.com/'>
								<BsTwitter />
							</a>
						</li>
						<li className='bg-gray-700 rounded-full mb-1 w-8 h-8 p-2 hover:bg-yellow-500'>
							<a href='https://instagram.com/'>
								<BsInstagram />
							</a>
						</li>
					</ul>

					<div className='relative md:absolute bottom-0'>
						<p className='flex gap-x-2'>
							<BsFillEyeFill className='mt-1' /> {profile?.viewsCount || 1} {t('profile_card_views')}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfileCard
