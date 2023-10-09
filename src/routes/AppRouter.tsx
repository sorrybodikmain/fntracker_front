import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/home/HomePage'
import { FC, lazy } from 'react'

const ItemPage = lazy(() => import('../pages/shop/ItemPage'))
const StatsPage = lazy(() => import('../pages/stats/StatsPage'))
const ShopPage = lazy(() => import( '../pages/shop/ShopPage'))
const MapComparePage = lazy(() => import('../pages/maps/MapComparePage'))
const UpcomingItemsPage = lazy(() => import('../pages/shop/UpcomingItemsPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))
const AllItemsPage = lazy(() => import('../pages/shop/AllItemsPage'))
const BattlePassPage = lazy(() => import('../pages/battle-pass/BattlePassPage'))

const AppRouter: FC = () => {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/locker/:id' element={<ItemPage />} />
			<Route path='/stats/:nickname' element={<StatsPage />} />
			<Route path='/shop' element={<ShopPage />} />
			<Route path='/upcoming-items' element={<UpcomingItemsPage />} />
			<Route path='/all-items' element={<AllItemsPage />} />
			<Route path='/compare-maps' element={<MapComparePage />} />
			<Route path='/battle-pass/:season' element={<BattlePassPage />} />
			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	)
}

export default AppRouter
