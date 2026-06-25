interface SiteLogoProps {
	className?: string
	accentClassName?: string
}

export function SiteLogo({
	className = '',
	accentClassName = 'text-primary'
}: SiteLogoProps) {
	return (
		<span className={className}>
			<span className={accentClassName}>Fortnite</span>Tracker
		</span>
	)
}
