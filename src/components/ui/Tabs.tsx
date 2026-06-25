interface TabsProps {
	tabs: { id: string; label: string }[]
	activeId: string
	onChange: (id: string) => void
	className?: string
}

export function Tabs({ tabs, activeId, onChange, className = '' }: TabsProps) {
	return (
		<div className={`:uno: flex flex-wrap gap-2 ${className}`}>
			{tabs.map(tab => (
				<button
					key={tab.id}
					type='button'
					onClick={() => onChange(tab.id)}
					className={`:uno: rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${activeId === tab.id
							? 'bg-primary/20 text-primary border border-primary/40 shadow-glowSm'
							: 'bg-surface text-muted border border-white/8 hover:text-foreground hover:border-white/15'
						}`}
				>
					{tab.label}
				</button>
			))}
		</div>
	)
}
