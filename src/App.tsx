import React from 'react'
import { ToastContainer } from 'react-toastify'
import AppRouter from './routes/AppRouter'
import Layout from '@/components/Layout'

function App() {
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
