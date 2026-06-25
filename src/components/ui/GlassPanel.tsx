import type { ReactNode } from 'react'

interface GlassPanelProps {
	children: ReactNode
	className?: string
}

export function GlassPanel({ children, className = '' }: GlassPanelProps) {
	return (
		<div className={`glass-frosted :uno: rounded-xl ${className}`}>
			{children}
		</div>
	)
}
