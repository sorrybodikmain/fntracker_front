import { Skeleton } from '@/components/ui/Skeleton'

export function SkeletonCard() {
	return (
		<div className=':uno: space-y-4'>
			<Skeleton className=':uno: h-6 w-36' />
			<Skeleton className=':uno: h-44 w-full' />
		</div>
	)
}
