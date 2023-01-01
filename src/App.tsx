import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import ShopPage from './pages/shop/ShopPage'
import HomePage from './pages/home/HomePage'
import ItemDetailPage from './pages/shop/ItemDetailPage'
import StatsPage from './pages/stats/StatsPage'

function App() {
	return (
		<>
			<Suspense fallback={'loading'}>
				<Routes>
					<Route path={'/'} element={<HomePage />} />
					<Route path={'locker/:id'} element={<ItemDetailPage />} />
					<Route path={'stats/:nickname'} element={<StatsPage />} />
					<Route path={'shop/'} element={<ShopPage />} />
				</Routes>
			</Suspense>
		</>

	)
}

export default App
