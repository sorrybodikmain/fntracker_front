import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string
}

export function Input({ className = '', ...props }: InputProps) {
	return (
		<input
			className={`input-field :uno: w-full rounded-lg px-4 py-3 text-foreground placeholder:text-muted/70 text-sm transition-all duration-200 focus:outline-none ${className}`}
			{...props}
		/>
	)
}
