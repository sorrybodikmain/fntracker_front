import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ShopPage from './pages/shop/ShopPage'
import HomePage from './pages/home/HomePage'
import ItemDetailPage from './pages/shop/ItemDetailPage'

function App() {
	return (
		<>
			<Routes>
				<Route path={'/'} element={<HomePage />} />
				<Route path={'shop/item/:id'} element={<ItemDetailPage />} />
				<Route path={'shop/'} element={<ShopPage />} />
			</Routes>
		</>

	)
}

export default App
