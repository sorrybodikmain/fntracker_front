import {FC, useState} from 'react'
import {useParams} from 'react-router-dom'
import useSWR from 'swr'
import {fetcher} from '@/lib/apiFetcher'
import {ShopItemDetail} from '@/api/types/shop.type'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'

const AboutItem: FC = () => {
    const [like, setLike] = useState<boolean>(false)
    const handleLike = () => setLike(!like)
    const {productId} = useParams()
    const {data} = useSWR<ShopItemDetail>(
        `https://fortniteapi.io/v2/items/get?id=${productId}&lang=en`,
        fetcher
    )


    return (
        <>
            <div className='container text-white mx-auto p-3'>
                <h2 className='border-l-4 border-primary pl-2 mb-4'>
                    {'Product review'.toUpperCase()}
                </h2>
                <div className='flex flex-wrap bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition'>
                    <div className='w-full md:w-3/12 mb-3 md:mb-0 mx-auto'>
                        <div className='relative bg-cover shadow-lg'>
                            <img
                                src={data?.item.images.background! || '/images/preloader.gif'}
                                alt={'shop-item-image'}
                                className='object-cover w-full rounded-lg'
                            />
                        </div>
                    </div>

                    <div className='relative w-full md:w-9/12 xl:w-7/12 px-3 mb-4 md:mb-0 mr-auto text-gray-500'>
                        <h5 className='text-2xl mb-1 text-white flex'>
                            {data?.item.name}
                            <div className='ml-auto' onClick={handleLike}>
                                {like ? <AiFillHeart/> : <AiOutlineHeart/>}
                            </div>
                        </h5>
                        <p className='text-md'>
                            {data?.item.rarity.name} | {data?.item.type.name}
                        </p>
                        <p className='text-md'>{data?.item.description}</p>
                        <p className='text-sm'>
                            {Math.floor(data?.item.interest! * 100)}% of users are interested in this
                            item
                        </p>
                        <div className='items-end bottom-0 relative lg:absolute mt-2'>
                            {
                                data?.item.releaseDate ?
                                    <p>First appeared on {data?.item.releaseDate}</p> : null
                            }
                            {
                                data?.item.battlepass ?
                                    <h4 className='text-white'>
                                        This {data?.item.type.name.toLowerCase()} was available in the battle pass
                                        of {data.item.battlepass.displayText.chapterSeason.toLowerCase()}.
                                    </h4> : <h4 className='text-white text-lg'>
                                        Sold for {data?.item.price} V-bucks.
                                    </h4>
                            }
                        </div>
                    </div>
                </div>
                {data?.item.shopHistory ? <>
                    <div className='mb-4'>
                        <h2 className='border-l-4 border-primary pl-2 my-4'>
                            {'Last times in the store'.toUpperCase()}
                        </h2>
                        <div className='flex flex-wrap bg-gray-600 rounded-lg p-3 hover:scale-[1.01] transition'>
                            <table className='w-full text-sm text-left'>
                                <thead className='text-xs uppercase text-gray-300'>
                                <tr>
                                    <th scope='col' className='py-3 px-6'>
                                        Date
                                    </th>
                                    <th scope='col' className='py-3 px-6'>
                                        Price
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {data?.item.shopHistory.map((item, index) => (
                                    <tr key={index} className='text-white'>
                                        <td className='py-4 px-6'>{item}</td>
                                        <td className='py-4 px-6'>{data?.item.price}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </> : null}

            </div>
        </>

    )
}

export default AboutItem
