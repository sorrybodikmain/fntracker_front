export function Preloader() {
	return (
		<div className=':uno: flex justify-center items-center p-3 min-h-screen'>
			<div className=':uno: relative'>
				<span className=':uno: absolute inset-0 rounded-full bg-primary/30 blur-xl animate-pulse' />
				<span className=':uno: relative inline-flex rounded-full h-10 w-10 border-2 border-primary border-t-transparent animate-spin' />
			</div>
		</div>
	)
}
