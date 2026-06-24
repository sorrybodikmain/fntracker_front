import { Suspense, type ReactNode } from 'react'
import { Header } from './header/Header'
import { Footer } from './footer/Footer'

interface LayoutProps {
	children: ReactNode
}

export function Layout({ children }: LayoutProps) {
	return (
		<main className='bg-gray-900'>
			<Header />
			<Suspense fallback={null}>{children}</Suspense>
			<Footer />
		</main>
	)
}
