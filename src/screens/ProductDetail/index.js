import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function ProductDetail() {

    const location = useLocation();
    const navigate = useNavigate()

    const [brandLogo, setBrandLogo] = useState(null)
    const [sound, setSound] = useState(null);
    const [productsImages, setProductsImages] = useState()
    const [name, setName] = useState('')
    const [price, setPrice] = useState()
    const [quantity, setQuantity] = useState()
    const [brandName, setBrandName] = useState('')
    const [description, setDescription] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(() => {
        if (location.state) {
            setName(location.state?.name)
            setQuantity(location.state?.quantity)
            setPrice(location.state?.price)
            setBrandName(location.state?.brand?.name)
            setBrandLogo(location.state?.brand?.logo)
            setSound(location.state?.sound)
            setDescription(location.state?.description)
            setProductsImages(location.state?.images)
        }
    }, [location.state])

    return (
        <div className='w-full bg-gray flex flex-col relative'>
            <div
                className='flex items-center justify-between px-6 py-4  text-black text-xl font-bold'
            >
                Product detail
                <img src={brandLogo} className='w-10' />
            </div>
            <div className=' w-90p bg-white mx-auto shadow-lg rounded-md flex flex-row gap-20 p-6'>
                <div className='w-10p flex flex-col items-center  max-h-[65vh]  overflow-y-scroll'>
                    {
                        productsImages?.map((item, index) => {
                            return (
                                <img src={item} key={index}
                                    className={
                                        index === selectedIndex ?
                                            "border-b border-blue w-80p active:opacity-50 mt-5 cursor-pointer bg-gray p-2 rounded-md shadow-md"
                                            :
                                            " w-80p active:opacity-50 mt-5 cursor-pointer bg-gray p-2 rounded-md shadow-md"
                                    }
                                    onClick={() => setSelectedIndex(index)}
                                />
                            )
                        })
                    }
                </div>
                <div className='w-1/2'>
                    <img src={productsImages && productsImages[selectedIndex]} className='w-full max-h-[65vh]  object-contain shadow-md rounded-md'
                    />
                </div>
                <div className=' w-1/2'>
                    <div className='flex flex-col'>
                        <div className='text-md font-bold ml-1'>
                            Brand Name
                        </div>
                        <div
                            className=' w-full focus:outline-none p-3 bg-disable2 rounded-md  mt-2'
                        >
                            {brandName}
                        </div>
                    </div>
                    <div className='flex flex-col mt-2'>
                        <div className='text-md font-bold ml-1'>
                            Product Name
                        </div>
                        <div
                            className=' w-full focus:outline-none p-3 bg-disable2 rounded-md  mt-2'
                        >
                            {name}
                        </div>
                    </div>
                    <div className='flex flex-col mt-2'>
                        <div className='text-md font-bold ml-1'>
                            Price
                        </div>
                        <div
                            className=' w-full focus:outline-none p-3 bg-disable2 rounded-md  mt-2'
                        >
                            {price}
                        </div>
                    </div>
                    <div className='flex flex-col mt-2'>
                        <div className='text-md font-bold ml-1'>
                            Quantity
                        </div>
                        <div
                            className=' w-full focus:outline-none p-3 bg-disable2 rounded-md  mt-2'
                        >
                            {quantity}
                        </div>
                    </div>
                    <div className='flex flex-col mt-2'>
                        <div className='text-md font-bold ml-1'>
                            Description
                        </div>
                        <div
                            className=' w-full focus:outline-none p-3 bg-disable2 rounded-md  mt-2'
                        >
                            {description}
                        </div>
                    </div>
                    <div className='flex flex-col mt-2'>
                        <div className='text-md font-bold ml-1'>
                            Sound
                        </div>
                        <audio controls
                            className='w-full h-12 mt-2'
                        >
                            <source src={location.state?.sound || sound} type="" />
                            Your browser does not support the audio tag.
                        </audio>
                    </div>
                </div>
            </div>
        </div>
    )
}
