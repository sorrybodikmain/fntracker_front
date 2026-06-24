'use client'

import ReactGA from 'react-ga4'

export const initGA = (trackingId: string) => {
	ReactGA.initialize(trackingId)
}

export const logPageView = () => {
	ReactGA.set({ page: window.location.pathname })
	ReactGA.send({
		hitType: 'pageview',
		page: window.location.pathname,
		title: document.title
	})
}

export const logEvent = (
	category: string,
	action: string,
	label?: string,
	value?: number
) => {
	ReactGA.event({ category, action, label, value })
}
