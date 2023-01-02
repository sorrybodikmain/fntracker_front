import { FC, PropsWithChildren, Suspense } from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'


const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<main className={'bg-gray-900'}>
				<Header />
				<Suspense fallback={'loading'}>
					{children}
				</Suspense>
				<Footer />
			</main>
		</>
	)
}

export default Layout
