import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string
}

export function Input({ className = '', ...props }: InputProps) {
	return (
		<input
			className={`:uno: w-full rounded-lg border border-white/10 bg-surface-elevated/80 backdrop-blur-sm px-4 py-3 text-foreground placeholder:text-muted text-sm transition-all duration-200 focus:border-primary/50 focus:shadow-glowSm focus:outline-none ${className}`}
			{...props}
		/>
	)
}
