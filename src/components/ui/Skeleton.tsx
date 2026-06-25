interface SkeletonProps {
	className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
	return (
		<div
			className={`:uno: animate-pulse rounded-lg bg-surface ${className}`}
		/>
	)
}
