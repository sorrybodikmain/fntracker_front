import type { ReactNode } from 'react'

interface CardProps {
	children: ReactNode
	className?: string
	hover?: boolean
	glow?: boolean
}

export function Card({ children, className = '', hover = true, glow = false }: CardProps) {
	return (
		<div
			className={`:uno: rounded-xl border border-white/8 bg-surface backdrop-blur-md shadow-card overflow-hidden transition-all duration-250 ${hover ? 'hover:scale-[1.02] hover:border-primary/30 hover:shadow-glowSm cursor-default' : ''
				} ${glow ? 'shadow-glowSm border-primary/20' : ''} ${className}`}
		>
			{children}
		</div>
	)
}
