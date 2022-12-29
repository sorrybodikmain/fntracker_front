import { FC } from 'react'
import Layout from '@/components/layout/Layout'
import { useTranslation } from 'react-i18next'
import ShopBanner from '@/components/layout/shop/ShopBanner'
import ShopList from '@/components/layout/shop/ShopList'

const Shop: FC = () => {
	const { t } = useTranslation('common')
	return (
		<>
			<Layout>
				<ShopBanner />
				<ShopList />
			</Layout>
		</>
	)
}

export default Shop
