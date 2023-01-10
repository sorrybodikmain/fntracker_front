import { FC } from 'react'
import CheckEmailForm from '@/components/user/recovery/steps/CheckEmailForm'
import CheckRecoveryLink from '@/components/user/recovery/steps/CheckRecoveryLink'
import { useSearchParams } from 'react-router-dom'

const RecoveryForms: FC = () => {
	const [searchParams] = useSearchParams()

	return (
		<>
			<div className='min-h-[81.1vh] flex max-w-[1920px] mx-auto'>
				<div
					className='hidden lg:flex w-full lg:w-1/2 justify-around items-center bg-gradient-to-bl from-blue-800 to-black'>
					<div className=' w-full mx-auto px-20 flex-col items-center space-y-6'>
						<h1 className='text-white font-bold text-4xl font-sans'>FNTracker Recovery</h1>
					</div>
				</div>

				<div className='flex w-full lg:w-1/2 justify-center items-center bg-gray-900 space-y-8'>
					<div className='w-full px-8 md:px-32 lg:px-24'>
						{searchParams.get('recid') ? <CheckEmailForm hide={false} /> : <CheckEmailForm hide={true} />}
						{searchParams.get('recid') ? <CheckRecoveryLink hide={true} /> : <CheckRecoveryLink hide={false} />}
					</div>

				</div>
			</div>
		</>
	)
}

export default RecoveryForms
