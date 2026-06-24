import { getTranslations } from 'next-intl/server'
import type { BRStats } from '@/types/fnapi'

interface StatsProfileCardProps {
	stats: BRStats
	nickname: string
	views?: number
}

export async function StatsProfileCard({
	stats,
	nickname,
	views
}: StatsProfileCardProps) {
	const t = await getTranslations('stats')

	return (
		<div className=':uno: container text-white mx-auto p-3'>
			<h1 className=':uno: border-l-4 border-primary pl-2 mb-4'>
				{t('profile_card_title').toUpperCase()}
			</h1>
			<div className=':uno: flex flex-wrap rounded-lg p-3 hover:scale-[1.01] transition bg-gradient-to-r from-purple-900 to-cyan-900'>
				<div className=':uno: relative w-full md:w-9/12 xl:w-7/12 px-3 mb-4 md:mb-0 mr-auto text-gray-500'>
					<h1 className=':uno: text-2xl mb-1 text-white gap-x-2 flex'>
						{nickname}
						<p className=':uno: text-sm mt-3'>{stats.account.name}</p>
					</h1>
					<p className=':uno: text-gray-300'>
						Battle Pass Lv. {stats.battlePass.level} (
						{stats.battlePass.progress}%)
					</p>
					<div className=':uno: relative md:absolute bottom-0'>
						<p className=':uno: flex gap-x-2'>
							{views ?? 1} {t('profile_card_views')}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
