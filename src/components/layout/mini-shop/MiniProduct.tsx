import {FC, PropsWithChildren} from 'react'
import {Link} from 'react-router-dom'
import {ItemShop} from '@/api/types/shop.type'

const MiniProduct: FC<PropsWithChildren<{ data: ItemShop }>> = ({data}) => {
    return (
        <div className='relative overflow-hidden rounded-lg hover:scale-105 transition'>
            <Link to={'/shop/item/' + data.mainId}>
                <div className='relative w-full h-40 sm:h-44 md:h-52 lg:h-36 object-cover'>
                    <img
                        src={data.displayAssets[0].background || '/images/preloader.gif'}
                        alt={data.mainId}
                    />
                </div>

                <div className='absolute text-xs sm:text-sm bottom-0 w-full bg-gray-600'>
                    <h1 className='text-center text-gray-100'>{data.displayName}</h1>
                    <p className=' text-gray-400 flex justify-center'>
                        {data.price.finalPrice}
                        <img
                            src={'/images/v-bucks.png'}
                            className='h-5'
                            alt='v-bucks icon'
                        />
                    </p>
                </div>
            </Link>
        </div>
    )
}

export default MiniProduct
