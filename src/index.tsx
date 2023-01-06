import ReactDOM from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import Store from './store/store'
import { createContext } from 'react'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)

interface IState {
	store: Store
}
const store = new Store()
export const Context = createContext<IState>({ store })

root.render(
	<Context.Provider value={{ store }}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Context.Provider>
)

