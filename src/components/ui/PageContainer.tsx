import type { ReactNode } from 'react'

interface PageContainerProps {
	children: ReactNode
	className?: string
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
	return (
		<div
			className={`:uno: container mx-auto min-h-screen px-4 py-6 md:px-6 md:py-8 text-foreground ${className}`}
		>
			{children}
		</div>
	)
}
