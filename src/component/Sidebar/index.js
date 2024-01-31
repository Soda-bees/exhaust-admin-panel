import React from 'react'
import images from '../../services/images'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {

    const location = useLocation();
    const activePath = location.pathname;

    return (
        <div className='w-15p  h-[100vh] flex flex-col items-center fixed'>
            <Link className='w-80p mt-5' to={'/'}>
            <img src={images.sigiinLogo} className='w-full  cursor-pointer' />
            </Link>
            <img src={images.line} className='w-80p mt-5 mb-10' />
            <Link
                className={activePath === '/' ?
                    "bg-blue w-80p flex text-white text-lg items-center py-3 rounded-md cursor-pointer mt-5 active:opacity-50"
                    :
                    "hover:bg-gray w-80p flex text-black text-lg items-center py-3 rounded-md cursor-pointer mt-5 active:opacity-50"
                }
            // className='bg-blue w-80p flex text-white text-lg items-center py-3 rounded-md cursor-pointer mt-5 active:opacity-50'
            >
                <img src={activePath === '/' ? images.dashboard2 : images.dashboard} className='w-5 h-5 mr-4 ml-5' />
                Dashboard
            </Link>
            <Link
                to={'/products'}
                // className='hover:bg-gray w-80p flex text-black text-lg items-center py-3 rounded-md cursor-pointer mt-5 active:opacity-50'
                className={activePath === '/products' || activePath ===  "/addProduct" ?
                    "bg-blue w-80p flex text-white text-lg items-center py-3 rounded-md cursor-pointer mt-5 active:opacity-50"
                    :
                    "hover:bg-gray w-80p flex text-black text-lg items-center py-3 rounded-md cursor-pointer mt-5 active:opacity-50"
                }
            >
                <img src={activePath === '/products' || activePath ===  "/addProduct" ? images.product2 : images.product} className='w-5 h-5 mr-4 ml-5' />
                All products
            </Link>
            <Link
                to={'/orders'}
                className={activePath === '/orders' ?
                    "bg-blue w-80p flex text-white text-lg items-center py-3 rounded-md cursor-pointer mt-5 active:opacity-50"
                    :
                    "hover:bg-gray w-80p flex text-black text-lg items-center py-3 rounded-md cursor-pointer mt-5 active:opacity-50"
                }
            // className='hover:bg-gray w-80p flex text-black text-lg items-center py-3 rounded-md cursor-pointer mt-5 active:opacity-50'
            >
                <img src={activePath === '/orders' ? images.order2 : images.order} className='w-5 h-5 mr-4 ml-5' />
                Order list
            </Link>
        </div>
    )
}
