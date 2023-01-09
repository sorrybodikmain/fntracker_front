import React from 'react'
import { ToastContainer } from 'react-toastify'
import PublicRoutes from './routes/PublicRoutes'

function App() {
	return (
		<>
			<PublicRoutes />
			<ToastContainer
				position='top-right'
				closeOnClick
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='colored'
			/>
		</>

	)
}

export default App
