import ReactDOM from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { HelmetProvider } from 'react-helmet-async'

const root = ReactDOM.createRoot(
	document.getElementById('app') as HTMLElement
)

root.render(
	<HelmetProvider>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</HelmetProvider>
)

