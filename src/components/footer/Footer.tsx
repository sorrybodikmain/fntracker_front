import { FC } from 'react'
import {Link} from 'react-router-dom'

const Footer: FC = () => {
	return (
		<>
			<footer className='mx-auto container text-gray-300 border-t-2 border-gray-600'>
				<div className='w-full p-10'>
					<ul className='flex items-center justify-center text-center text-gray-500'>
						<li>
							<Link to={'terms'} className='hover:text-gray-100'>
								Terms & Conditions
							</Link>
						</li>
						<li className='px-4 text-gray-100'>
							FNTracker - All Rights Reserved. Fortnite is a registered
							trademark of Epic Games.
						</li>
						<li>
							<Link to={'policy'} className='hover:text-gray-100'>
								Privacy Policy
							</Link>
						</li>
					</ul>
				</div>
			</footer>
		</>
	)
}
export default Footer
