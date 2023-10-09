import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import i18next from 'i18next'
import { IBattlePassResponse } from '@/interfaces'
import { useParams } from 'react-router-dom'
import { fetcher } from '@/libs/apiFetcher.ts'
import Preloader from '@/components/preloaders/Preloader.tsx'
import AppHelmet from '@/components/AppHelmet.tsx'
import ShopSection from '@/components/shop/ShopSection.tsx'
import BPCard from '@/components/battle-pass/bpcard/BPCard.tsx'
import BPVideoCard from '@/components/battle-pass/BPVideoCard.tsx'

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
				<div className=':uno: container mx-auto text-white p-3 min-h-screen'>
					<BPCard data={data!} />
					<BPVideoCard videos={data!.videos} />
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
