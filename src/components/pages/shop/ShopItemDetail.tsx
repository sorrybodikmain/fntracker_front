import { FC } from 'react'
import Layout from '@/components/layout/Layout'
import { useTranslation } from 'react-i18next'
import AboutItem from '@/components/layout/shop/item/AboutItem'

const ShopItemDetail: FC = () => {
	const { t } = useTranslation('common')
	return (
		<>
			<Layout>
				<AboutItem />
			</Layout>
		</>
	)
}

export default ShopItemDetail
