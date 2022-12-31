import {FC} from 'react'

const ShopBanner: FC = () => {
    const value = new Date()

    return (
        <div className='container mx-auto text-white p-3'>
            <div className='bg-gray-700 p-4 rounded'>
                <h2 className='text-lg'> Fortnite Daily Shop</h2>
                <p className='text-sm'>
                    The Fortnite Item Shop is updated daily. In this section, you can
                    subscribe to a specific product and receive a notification when it
                    comes out in the store. To do this, you only need to click on the like
                    and allow receiving notifications from the browser, you also need an
                    account to save your likes. When the store is updated, the site is
                    automatically updated.
                </p>
                <h3 className='text-center text-md font-bold pt-2'>
                    Auto update via {`${23 - value.getUTCHours()} h.`}
                </h3>
            </div>
        </div>
    )
}

export default ShopBanner
