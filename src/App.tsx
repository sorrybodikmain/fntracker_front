import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ShopPage from './pages/shop/ShopPage'
import HomePage from './pages/home/HomePage'
import AboutItemPage from './pages/shop/AboutItemPage'
import StatsPage from './pages/stats/StatsPage'
import ProfilePage from './pages/user/ProfilePage'
import ActivatePage from './pages/user/ActivatePage'
import RegisterPage from './pages/user/RegisterPage'
import LoginPage from './pages/user/LoginPage'
import RecoveryPage from './pages/user/RecoveryPage'
import SubscriptionPage from './pages/user/SubscriptionPage'

function App() {
	return (
		<>
				<Routes>
					<Route path={'/'} element={<HomePage />} />
					<Route path={'locker/:id'} element={<AboutItemPage />} />
					<Route path={'stats/:nickname'} element={<StatsPage />} />
					<Route path={'shop/'} element={<ShopPage />} />

					<Route path={'/user/profile'} element={<ProfilePage />} />
					<Route path={'/user/favorite'} element={<SubscriptionPage />} />
					<Route path={'/user/activate'} element={<ActivatePage />} />
					<Route path={'/user/register'} element={<RegisterPage />} />
					<Route path={'/user/login'} element={<LoginPage />} />
					<Route path={'/user/recovery'} element={<RecoveryPage />} />
				</Routes>
		</>

	)
}

export default App
