import { Popover } from '@headlessui/react'
import {Link} from 'react-router-dom'
import { FC } from 'react'
import { VscListFlat } from 'react-icons/vsc'

interface Route {
	name: string
	href: string
}

const MobNav: FC<{ routes: Route[] }> = ({ routes }) => {
	return (
		<>
			<Popover>
				<Popover.Button className='py-2 md:hidden'>
					<VscListFlat />
				</Popover.Button>
				<Popover.Panel className='fixed z-10 bg-gray-800 px-2 py-2 rounded-lg -mx-10'>
					<ul className='text-xs text-gray-400'>
						{routes.map((route, index) => (
							<li key={index}>
								<Link to={route.href} className='py-1 md:mx-1 hover:text-gray-300'>
									{route.name}
								</Link>
							</li>
						))}
					</ul>
				</Popover.Panel>
			</Popover>
		</>
	)
}

export default MobNav
