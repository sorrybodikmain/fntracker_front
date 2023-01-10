import { FC, PropsWithChildren, Suspense } from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import CookieBanner from '@/components/CookieBanner'
import ScrollButton from '@/components/ScrollButton'
import 'react-toastify/dist/ReactToastify.css'

const Layout: FC<PropsWithChildren> = ({ children }) => {

	return (
		<>
			<main className={'bg-gray-900'}>
				<Header />
				<Suspense fallback={'loading'}>
					{children}
				</Suspense>

				<ScrollButton />
				<Footer />
				<CookieBanner />
			</main>
		</>
	)
}

export default Layout
