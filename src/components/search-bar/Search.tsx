import { AccountIdStr } from '@/interfaces/user-stats.interface.ts'
import { useDebounce } from '@/hooks/useDebounce'
import { useOutside } from '@/hooks/useOutside'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { logEvent } from '@/utils/gtag.utils'
import { fetcher } from '@/libs/apiFetcher'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const Search: FC = () => {
	const { t } = useTranslation('home')
	const [nickname, setNickname] = useState('')
	const [data, setData] = useState<AccountIdStr>()
	const { ref, isShow, setIsShow } = useOutside(false)
	const debounced = useDebounce<string>(nickname)
	const navigate = useNavigate()
	const handleSubmit = (e: any) => {
		navigate(`/stats/${nickname}`)
		logEvent('Search-Profile', 'Search', `Searched-'${nickname}'`)
		e.preventDefault()
	}

	useEffect(() => {
		if (debounced.length > 2)
			fetcher(
				`https://fortniteapi.io/v1/lookup?strict=false&limit=10&username=${nickname}`
			).then(res => {
				setIsShow(true)
				setData(res)
			})
		else setIsShow(false)
	}, [debounced])

	return (
		<div className=':uno: flex items-center justify-center'>
			<div className=':uno: relative text-sm'>
				<form onSubmit={handleSubmit}>
					<input
						type={'search'}
						value={nickname}
						onChange={e => setNickname(e.target.value)}
						placeholder={t('seach_input')!}
						className=':uno: w-full sm:w-80 h-9 bg-gray-800 rounded-lg p-2 hover:scale-105 transition'
					/>
				</form>

				{isShow && (
					<div
						ref={ref}
						className=':uno: absolute z-50 w-full sm:w-80 bg-gray-800 rounded-md mt-1 max-h-72 overflow-y-auto'
					>
						<ul className=':uno: divide-y-[1px]'>
							{data?.all_matches?.map(item => (
								<li
									key={item.sortPosition}
									className=':uno: flex justify-between p-2'
								>
									<Link to={'stats/' + item.matches[0].value}>
										{item.matches[0].value}
									</Link>
									<p className=':uno: text-gray-400'>{item.matches[0].platform}</p>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	)
}

export default Search
