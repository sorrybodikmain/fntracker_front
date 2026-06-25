import type { ReactNode } from 'react'

interface SectionHeadingProps {
	children: ReactNode
	subtitle?: string
	className?: string
}

export function SectionHeading({ children, subtitle, className = '' }: SectionHeadingProps) {
	return (
		<div className={`:uno: mb-6 ${className}`}>
			<div className=':uno: flex items-center gap-3'>
				<div className=':uno: h-8 w-1 rounded-full bg-gradient-to-b from-primary to-accent shadow-glowSm' />
				<h2 className=':uno: font-display text-xl md:text-2xl font-bold uppercase tracking-wider text-foreground'>
					{children}
				</h2>
			</div>
			{subtitle ? (
				<p className=':uno: mt-2 ml-4 text-sm text-muted'>{subtitle}</p>
			) : null}
		</div>
	)
}
