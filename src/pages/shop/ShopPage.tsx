import { FC } from 'react'
import Layout from "@/components/Layout";
import ShopBanner from "@/components/shop/ShopBanner";
import ShopList from "@/components/shop/ShopList";

const ShopPage: FC = () => {
	return (
		<>
			<Layout>
				<ShopBanner />
				<ShopList />
			</Layout>
		</>
	)
}

export default ShopPage
