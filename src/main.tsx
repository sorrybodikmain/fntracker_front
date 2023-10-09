import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App.tsx'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

createRoot(document.getElementById('root')!).render(
	<HelmetProvider>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</HelmetProvider>
)
