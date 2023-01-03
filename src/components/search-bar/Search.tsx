import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetcher } from '@/libs/apiFetcher'
import { AccountIdStr } from '@/api/types/user-stats.type'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

const Search: FC = () => {
	const { t } = useTranslation('home')
	const [nickname, setNickname] = useState('')
	const [data, setData] = useState<AccountIdStr>()
	const [temp, setTemp] = useState<AccountIdStr>()
	const navigate = useNavigate()
	const handleSubmit = (e: any) => {
		navigate('/stats/' + nickname)
		e.preventDefault()
	}
	const clearData = () => {
		setTemp(data)
		setTimeout(() => setData(undefined), 1000)
	}
	const returnData = () => {
		if (temp) setData(temp)
	}
	useEffect(() => {
		if (nickname.length !== 0) {
			fetcher(
				`https://fortniteapi.io/v1/lookup?strict=false&username=${nickname}`
			).then(res => setData(res))
		} else {
			setData(undefined)
		}
	}, [nickname])

	return (
		<div
			className='flex items-center justify-center'
			onMouseLeave={clearData}
			onMouseEnter={returnData}
		>
			<div className='relative'>
				<form onSubmit={handleSubmit}>
					<input
						type={'search'}
						value={nickname}
						onChange={e => {
							setNickname(e.target.value)
						}}
						placeholder={t('seach_input')!}
						className='w-full sm:w-80 h-9 bg-gray-800 rounded-lg p-2 hover:scale-105 transition'
					/>
				</form>
				<div className='absolute -ml-8 z-50 w-80 md:w-96 bg-gray-800 rounded-lg mt-1 max-h-72 text-sm overflow-y-auto'>
					<ul className='divide-y-[1px]'>
						{data?.all_matches?.map(item => (
							<li key={item.sortPosition} className='flex justify-between p-2'>
								<Link to={'stats/' + item.matches[0].value}>
									{item.matches[0].value}
								</Link>
								<p className={'text-gray-400'}>{item.matches[0].platform}</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Search
