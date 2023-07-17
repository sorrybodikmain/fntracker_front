import { FC, PropsWithChildren, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ShopItemResponse } from '@/types/shop.type'
import { ImSpinner9 } from 'react-icons/im'
import axios from 'axios'

const DatesGuesser: FC<PropsWithChildren<{ data: ShopItemResponse }>> = ({
	data
}) => {
	const { t } = useTranslation('locker')
	const [dates, setDates] = useState<string[]>()
	const [loaded, setLoaded] = useState<boolean>()
	const handleLoad = () => {
		setLoaded(true)
		const dates = data.item.shopHistory.reverse()
		axios
			.post('http://localhost:8000/dates', { dates })
			.then(value => {
				setDates(value.data)
				setLoaded(false)
			})
			.catch(() => setTimeout(() => setLoaded(false), 1000))
	}
	return (
		<>
			<h1 className='border-l-4 border-primary pl-2 my-4'>
				{t('possible_dates').toUpperCase()}
			</h1>
			<div className='flex bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition'>
				<div className='relative w-full px-1 text-gray-300'>
					{!dates ? (
						<div className='flex items-center justify-between'>
							<p className='font-medium text-white sm:text-sm'>
								{t('dates_guesser_title')}
							</p>
							<button
								onClick={handleLoad}
								className='flex items-center px-4 py-2 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-200'
							>
								{loaded ? (
									<>
										<ImSpinner9 className='inline w-4 h-4 mr-2 text-black animate-spin' />
										<span>{t('loading')}</span>
									</>
								) : (
									<span>{t('generate')}</span>
								)}
							</button>
						</div>
					) : (
						<div className='grid grid-cols-4 lg:grid-cols-8 gap-2'>
							{dates?.map((value, index) => (
								<p key={index} className='inline-flex flex-col mx-auto'>
									{value}
								</p>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default DatesGuesser
