import { Skeleton } from '@/components/ui/Skeleton'

export function SkeletonMiniShop() {
	const arr = Array(6).fill(0)

	return (
		<>
			{arr.map((_, index) => (
				<Skeleton key={index} className=':uno: aspect-square' />
			))}
		</>
	)
}
