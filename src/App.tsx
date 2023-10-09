import { useEffect } from 'react'
import { initGA, logPageView } from './utils'
import Layout from './components/Layout'
import AppRouter from './routes/AppRouter'
import { ToastContainer } from 'react-toastify'

function App() {

	useEffect(() => {
		initGA('G-0PPX7B396X')
		logPageView()
	}, [])

	return (
		<>
			<Layout>
				<AppRouter />
				<ToastContainer
					position='top-right'
					closeOnClick
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme='colored'
				/>
			</Layout>
		</>
	)
}

export default App
