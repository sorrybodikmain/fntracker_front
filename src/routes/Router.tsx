import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/home/HomePage'
import LockerItemPage from '../pages/shop/LockerItemPage'
import StatsPage from '../pages/stats/StatsPage'
import ShopPage from '../pages/shop/ShopPage'
import ProfilePage from '../pages/user/ProfilePage'
import SubscriptionPage from '../pages/user/SubscriptionPage'
import ActivationPage from '../pages/user/ActivationPage'
import RegisterPage from '../pages/user/RegisterPage'
import LoginPage from '../pages/user/LoginPage'
import RecoveryPage from '../pages/user/RecoveryPage'

const Router: FC = () => {

	return (
		<Routes>
			<Route path={'/'} element={<HomePage />} />
			<Route path={'locker/:id'} element={<LockerItemPage />} />
			<Route path={'stats/:nickname'} element={<StatsPage />} />
			<Route path={'shop/'} element={<ShopPage />} />
			<Route path={'/user/activate'} element={<ActivationPage />} />
			<Route path={'/user/register'} element={<RegisterPage />} />
			<Route path={'/user/login'} element={<LoginPage />} />
			<Route path={'/user/recovery'} element={<RecoveryPage />} />


			<Route path={'/user/profile'} element={<ProfilePage />} />
			<Route path={'/user/favorite'} element={<SubscriptionPage />} />
		</Routes>
	)
}

export default Router
