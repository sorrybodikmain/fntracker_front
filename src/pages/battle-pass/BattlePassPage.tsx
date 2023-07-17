import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import i18next from 'i18next'
import { fetcher } from '@/libs/apiFetcher'
import Preloader from '@/components/preloaders/Preloader'
import AppHelmet from '@/components/AppHelmet'
import { IBattlePassResponse } from '@/types/battle-pass.types'
import { useParams } from 'react-router-dom'
import ShopSection from '@/components/shop/ShopSection'
import BPCard from '@/components/battle-pass/bpcard/BPCard'
import BPVideos from '@/components/battle-pass/BPVideoCard'

const BattlePassPage: FC = () => {
	const { t } = useTranslation('battle-pass')
	const { season } = useParams()

	const { data, isLoading } = useSWR<IBattlePassResponse>(
		`https://fortniteapi.io/v2/battlepass?lang=${i18next.language}&season=${season}`,
		fetcher
	)
	const rewards = data?.rewards?.map(i => i.item)

	if (isLoading) return <Preloader />

	return (
		<>
			<AppHelmet title={t('bp_card_title')} desc={t('bp_card_title')!} />
			<div>
				<div className='container mx-auto text-white p-3 min-h-screen'>
					<BPCard data={data!} />
					<BPVideos videos={data!.videos} />
					<ShopSection
						items={rewards!}
						sectionName={t('rewards_card_title')!}
					/>
				</div>
			</div>
		</>
	)
}

export default BattlePassPage
