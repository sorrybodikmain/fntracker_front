import ReactGA from 'react-ga4'

const initGA = (trackingId: string) => {
	ReactGA.initialize(trackingId)
}

const logPageView = () => {
	ReactGA.set({ page: window.location.pathname })
	ReactGA.send({ pageView: window.location.pathname })
}

const logEvent = (
	category: string,
	action: string,
	label?: string,
	value?: number
) => {
	ReactGA.event({
		category,
		action,
		label,
		value
	})
}
export { initGA, logEvent, logPageView }
