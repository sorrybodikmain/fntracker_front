import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { BRStats } from '@/types/fnapi'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { Badge } from '@/components/ui/Badge'

interface StatsProfileCardProps {
	stats: BRStats
	nickname: string
}

export async function StatsProfileCard({
	stats,
	nickname
}: StatsProfileCardProps) {
	const t = await getTranslations('stats')

	return (
		<div>
			<SectionHeading>{t('profile_card_title')}</SectionHeading>
			<GlassPanel className=':uno: p-6 border-primary/20 overflow-hidden relative'>
				<div
					className=':uno: absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none'
					aria-hidden
				/>
				<div className=':uno: relative flex flex-col md:flex-row items-center gap-6'>
					<div className=':uno: relative shrink-0'>
						<div className=':uno: absolute inset-0 rounded-full bg-primary/30 blur-xl' />
						<Image
							src={stats.image || '/images/default-avatar.webp'}
							alt={nickname}
							width={128}
							height={128}
							className=':uno: relative object-cover rounded-full w-28 h-28 md:w-32 md:h-32 border-2 border-primary/50 shadow-glowSm'
						/>
					</div>
					<div className=':uno: flex-1 text-center md:text-left'>
						<h1 className=':uno: font-display text-2xl md:text-3xl font-bold text-foreground'>
							{nickname}
						</h1>
						<p className=':uno: text-sm text-muted mt-1'>
							{stats.account?.name ?? nickname}
						</p>
						{stats.battlePass ? (
							<Badge variant='accent' className=':uno: mt-3'>
								Battle Pass Lv. {stats.battlePass.level} ({stats.battlePass.progress}%)
							</Badge>
						) : null}
					</div>
				</div>
			</GlassPanel>
		</div>
	)
}
