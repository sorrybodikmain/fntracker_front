import { FC } from 'react'

const Preloader: FC = () => {
	return (
		<>
			<div className=':uno: flex justify-center items-center p-3 min-h-screen'>
				<span className=':uno: relative inline-flex rounded-full animate-ping h-10 w-10 bg-primary'></span>
			</div>
		</>
	)
}

export default Preloader
