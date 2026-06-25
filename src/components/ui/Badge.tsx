import type { ReactNode } from 'react'

type BadgeVariant = 'default' | 'primary' | 'accent' | 'muted'

interface BadgeProps {
	children: ReactNode
	variant?: BadgeVariant
	className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
	default: 'bg-surface-elevated text-foreground border-white/10',
	primary: 'bg-primary/15 text-primary border-primary/30',
	accent: 'bg-accent/15 text-accent border-accent/30',
	muted: 'bg-white/5 text-muted border-white/8'
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
	return (
		<span
			className={`:uno: inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
		>
			{children}
		</span>
	)
}
