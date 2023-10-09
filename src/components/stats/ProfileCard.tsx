import { FC } from 'react'
import { BsFillEyeFill } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'
import { ProfileInterface } from '@/interfaces'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface IProfileCardProps {
	profileData: ProfileInterface
	nickname?: string
	views?: number
}

const ProfileCard: FC<IProfileCardProps> = ({
																							profileData,
																							nickname,
																							views
																						}) => {
	const { t } = useTranslation('stats')

	return (
		<div className=':uno: container text-white mx-auto p-3'>
			<h1 className=':uno: border-l-4 border-primary pl-2 mb-4'>
				{t('profile_card_title').toUpperCase()}
			</h1>
			<div
				className=':uno: flex flex-wrap rounded-lg p-3 hover:scale-[1.01] transition bg-gradient-to-r from-purple-900 to-cyan-900'>
				<div className=':uno: w-full md:w-3/12 mb-3 md:mb-0 mx-auto'>
					<div className=':uno: relative bg-cover'>
						<LazyLoadImage
							src={`/images/flags/${profileData?.country || 'ua'}.svg`}
							alt={'country-image'}
							className=':uno: rounded w-10 absolute bottom-0 left-0'
						/>
						<LazyLoadImage
							src={profileData?.avatar || '/images/default-avatar.webp'}
							alt={'avatar-image'}
							className=':uno: object-cover rounded-full w-32 h-32'
						/>
					</div>
				</div>

				<div className=':uno: relative w-full md:w-9/12 xl:w-7/12 px-3 mb-4 md:mb-0 mr-auto text-gray-500'>
					<h1 className=':uno: text-2xl mb-1 text-white gap-x-2 flex'>
						{nickname || 'Your nickname'}
						<p className=':uno: text-sm mt-3'>{profileData?.fullName || ''}</p>
					</h1>
					<div className=':uno: relative md:absolute bottom-0'>
						<p className=':uno: flex flex gap-x-2'>
							<BsFillEyeFill className=':uno: mt-1' /> {views || 1}{' '}
							{t('profile_card_views')}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfileCard
