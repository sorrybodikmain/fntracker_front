import React from 'react'
import { ToastContainer } from 'react-toastify'
import Router from './routes/Router'

function App() {
	return (
		<>
			<Router />
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
