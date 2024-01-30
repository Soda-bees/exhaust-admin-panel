import React, { useEffect, useState } from 'react'
import { FadeLoader } from 'react-spinners'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { getAllProducts } from '../../services/Api';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/authTokenSlice';
import images from '../../services/images';

export default function Products() {

    const authToken = useSelector(selectAuthToken)

    const [loader, setLoader] = useState(false)
    const [allProducts, setAllProducts] = useState([])
    const [indexArray, setIndexArray] = useState()

    const notify = (message) => {
        toast.error(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };

    const handleGetAllProducts = async () => {
        try {
            setLoader(true)
            const response = await getAllProducts(authToken)
            console.log(response);
            if (response.success) {
                setLoader(false)
                setAllProducts(response.products)
            } else {
                setLoader(false)
                notify(response.message)
            }
        } catch (error) {
            setLoader(false)
            notify(error.message)
        }
    }

    useEffect(() => {
        handleGetAllProducts()
    }, [])


    const toggleIndex = (index) => {
        setIndexArray(prevArray => {
            const indexExists = indexArray
            if(index === indexExists){
                setIndexArray()
            }else{
                setIndexArray(index)
            }
        })
        // setIndexArray(prevArray => {
        //     const indexExists = prevArray.includes(index);
        //     if (indexExists) {
        //         return prevArray.filter(item => item !== index);
        //     } else {
        //         return [...prevArray, index];
        //     }
        // });
    };

    return (
        <div className='w-full h-full bg-gray'>
            <div className=' flex items-center justify-between px-5 text-black text-xl font-bold'>
                All Products
                <div className='bg-blue w-10 h-10 rounded-full flex items-center justify-center cursor-pointer active:opacity-50'>
                    <img src={images.add} />
                </div>
            </div>
            {
                loader ?
                    <div className='w-full h-full flex items-center justify-center'>
                        <FadeLoader size={100} color='#124694' />
                    </div>
                    :
                    <div className='px-5 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
                        {allProducts &&
                            allProducts.map((item, index) => {
                                return (
                                    <div key={index} className='bg-white p-2 rounded-md shadow-md'>
                                        <div className='flex items-start justify-between'>
                                            <img src={item?.images?.[0]} className='w-1/4  rounded-md' />
                                            <div className='w-full'>
                                                <div>{item?.name}</div>
                                                <div>{item?.brand?.name}</div>
                                                <div>{`$${item?.price}.00`}</div>
                                            </div>
                                            <div className='relative'>
                                                <img src={images.menu} className='w-8 cursor-pointer active:opacity-50' 
                                                onClick={() => toggleIndex(index)}
                                                />
                                                {
                                                    indexArray === index &&
                                                    // indexArray.includes(index) && 
                                                    (
                                                        <div className='bg-red-500 absolute right-2'>
                                                          <div
                                                          onClick={() => console.log(item.price)}
                                                          >View</div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div>Description</div>
                                        <div
                                            style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', WebkitLineClamp: 1 }}
                                        >
                                            {item.description}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
            }
            <ToastContainer />
        </div>
    )
}
