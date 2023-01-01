import {FC} from 'react'
import { useTranslation } from 'react-i18next'

const ShopBanner: FC = () => {
    const value = new Date()
    const {t} = useTranslation('shop')
    return (
        <div className='container mx-auto text-white p-3'>
            <div className='bg-gray-700 p-4 rounded'>
                <h2 className='text-lg'> {t('banner_title')}</h2>
                <p className='text-sm'>
                    {t('banner_body')}
                </p>
                <h3 className='text-center text-md font-bold pt-2'>
                    {t('banner_update')} {`${23 - value.getUTCHours()} h.`}
                </h3>
            </div>
        </div>
    )
}

export default ShopBanner
