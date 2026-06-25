import { Suspense, type ReactNode } from 'react'
import { Header } from './header/Header'
import { Footer } from './footer/Footer'
import { CookieBanner } from './CookieBanner'
import { Analytics } from './Analytics'

interface LayoutProps {
	children: ReactNode
}

export function Layout({ children }: LayoutProps) {
	return (
		<main className=':uno: min-h-screen bg-void text-foreground font-body'>
			<Header />
			<Suspense fallback={null}>{children}</Suspense>
			<Footer />
			<CookieBanner />
			<Analytics />
		</main>
	)
}
