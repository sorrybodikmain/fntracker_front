import { getTranslations } from 'next-intl/server'
import type { BRCosmetic } from '@/types/fnapi'
import { LikeButton } from '@/components/like/LikeButton'
import { ZoomableImage } from '@/components/shared/ZoomableImage'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { fixImageWidth } from '@/utils'
import { cosmeticDisplayImage } from '@/utils/cosmetic'

interface AboutItemCardProps {
	cosmetic: BRCosmetic
}

export async function AboutItemCard({ cosmetic }: AboutItemCardProps) {
	const t = await getTranslations('locker')

	return (
		<>
			<SectionHeading>{t('card_title')}</SectionHeading>
			<Card className=':uno: p-5 md:p-6'>
				<div className=':uno: flex flex-col lg:flex-row gap-6'>
					<div className=':uno: w-full lg:w-5/12 mx-auto'>
						<ZoomableImage
							src={fixImageWidth(cosmeticDisplayImage(cosmetic), 500)}
							alt={cosmetic.id}
							width={500}
							height={500}
							className=':uno: object-cover w-full rounded-xl border border-white/10'
							priority
						/>
					</div>
					<div className=':uno: flex-1'>
						<div className=':uno: flex items-start justify-between gap-4'>
							<h2 className=':uno: font-display text-2xl md:text-3xl font-bold text-foreground'>
								{cosmetic.name}
							</h2>
							<LikeButton
								itemId={cosmetic.id}
								itemName={cosmetic.name}
								likeLabel={t('like_item', { name: cosmetic.name })}
								unlikeLabel={t('unlike_item', { name: cosmetic.name })}
								className=':uno: shrink-0 text-3xl'
							/>
						</div>
						<div className=':uno: flex flex-wrap gap-2 mt-3'>
							{cosmetic.rarity?.displayValue ? (
								<Badge variant='primary'>{cosmetic.rarity.displayValue}</Badge>
							) : null}
							{cosmetic.type?.displayValue ? (
								<Badge variant='muted'>{cosmetic.type.displayValue}</Badge>
							) : null}
						</div>
						<p className=':uno: mt-4 text-muted leading-relaxed'>
							{cosmetic.description ?? ''}
						</p>
						{cosmetic.introduction?.text ? (
							<p className=':uno: mt-4 text-sm text-foreground border-l-2 border-accent pl-3'>
								{cosmetic.introduction.text}
							</p>
						) : null}
						{cosmetic.added ? (
							<p className=':uno: mt-4 text-xs text-muted'>
								{t('card_appeared')}{' '}
								{new Date(cosmetic.added).toLocaleDateString()}
							</p>
						) : null}
					</div>
				</div>
			</Card>
		</>
	)
}
