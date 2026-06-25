import { Skeleton } from '@/components/ui/Skeleton'

export function SkeletonNews() {
	const arr = Array(6).fill(0)

	return (
		<>
			{arr.map((_, index) => (
				<div key={index} className=':uno: flex flex-col md:flex-row gap-4 w-full'>
					<Skeleton className=':uno: w-full md:w-48 h-32' />
					<div className=':uno: flex-1 space-y-2'>
						<Skeleton className=':uno: h-5 w-3/4' />
						<Skeleton className=':uno: h-3 w-full' />
						<Skeleton className=':uno: h-3 w-2/3' />
					</div>
				</div>
			))}
		</>
	)
}
