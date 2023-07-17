import { initGA, logPageView } from '@/libs/gtag.utils'
import { ToastContainer } from 'react-toastify'
import AppRouter from './routes/AppRouter'
import Layout from '@/components/Layout'
import { useEffect } from 'react'

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
