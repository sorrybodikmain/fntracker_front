import type { ButtonHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant
	size?: ButtonSize
	href?: string
	children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
	primary:
		'bg-primary/15 text-primary border-primary/40 hover:bg-primary/25 hover:shadow-glowSm',
	secondary:
		'bg-surface-elevated text-foreground border-white/10 hover:border-primary/30 hover:bg-white/8',
	ghost: 'bg-transparent text-muted border-transparent hover:text-primary hover:bg-primary/10',
	accent:
		'bg-accent/15 text-accent border-accent/40 hover:bg-accent/25 hover:shadow-glowSm'
}

const sizeClasses: Record<ButtonSize, string> = {
	sm: 'px-3 py-1.5 text-xs',
	md: 'px-4 py-2 text-sm',
	lg: 'px-6 py-3 text-base'
}

export function Button({
	variant = 'primary',
	size = 'md',
	className = '',
	href,
	children,
	...props
}: ButtonProps) {
	const classes = `:uno: inline-flex items-center justify-center gap-2 rounded-lg border font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

	if (href) {
		return (
			<Link href={href} className={classes}>
				{children}
			</Link>
		)
	}

	return (
		<button type='button' className={classes} {...props}>
			{children}
		</button>
	)
}
