import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ShopPage from './pages/shop/ShopPage'
import HomePage from './pages/home/HomePage'
import AboutItemPage from './pages/shop/AboutItemPage'
import StatsPage from './pages/stats/StatsPage'
import Profile from './pages/user/profile/Profile'

function App() {
	return (
		<>
				<Routes>
					<Route path={'/'} element={<HomePage />} />
					<Route path={'locker/:id'} element={<AboutItemPage />} />
					<Route path={'stats/:nickname'} element={<StatsPage />} />
					<Route path={'shop/'} element={<ShopPage />} />
					<Route path={'/user/profile'} element={<Profile />} />
				</Routes>
		</>

	)
}

export default App
