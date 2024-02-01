import React, { useEffect, useState } from 'react'
import { FadeLoader } from 'react-spinners'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { getAllOrders } from '../../services/Api';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/authTokenSlice';


export default function Orders() {

    const authToken = useSelector(selectAuthToken)

    const [loader, setLoader] = useState(false)
    const [allOrders, setAllOrders] = useState([])

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

    const handleGetAllOrders = async () => {
        try {
            // setLoader(true)
            const response = await getAllOrders(authToken)
            if (response.success) {
                console.log(response);
                setAllOrders(response.allorder)
                setLoader(false)
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
        handleGetAllOrders()
    }, [])
    return (
        <div className='w-full bg-gray flex flex-col relative'>
            <div
                className='flex items-center justify-between px-6 py-4  text-black text-xl font-bold'
            >
                Orders
            </div>
            {
                loader ?
                    <div className='w-full absolute top-[40vh]  flex items-center justify-center mb-28'>
                        <FadeLoader size={100} color='#124694' />
                    </div>
                    :
                    <div className='w-90p bg-white mx-auto shadow-lg rounded-md flex flex-col p-6 '>
                        <div className=' flex flex-row items-center gap-3 border-b border-gray pb-4'>
                            <div className='w-16p text-black font-bold opacity-60 text-md'>Product Name</div>
                            <div className='w-16p text-black font-bold opacity-60 text-md'>Order ID</div>
                            <div className='w-16p text-black font-bold opacity-60 text-md'>Date</div>
                            <div className='w-16p text-black font-bold opacity-60 text-md'>Customer Name</div>
                            <div className='w-16p text-black font-bold opacity-60 text-md'>Status</div>
                            <div className='w-16p text-black font-bold opacity-60 text-md'>Amount</div>
                        </div>
                        {
                            allOrders &&
                            allOrders.map((item, index) => {
                                return (
                                    <div
                                        className=' flex flex-row items-center gap-3 border-b border-gray py-4'
                                        key={index}
                                    >
                                        <div className='w-16p text-black font-bold  text-md'>{item?.products[0]?.product?.name}</div>
                                        <div className='w-16p text-black font-bold  text-md'>  {`# ${item._id && item._id.toString().slice(0, 6)}`}</div>
                                        <div className='w-16p text-black font-bold  text-md'>
                                    {item.createdAt && new Date(item.createdAt).toLocaleString('en-us', 
                                    { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                                        </div>
                                        <div className='w-16p text-black font-bold  text-md'>{item?.userData?.name}</div>
                                        <div className='w-16p text-black font-bold  text-md flex items-center justify-start'
                                        >
                                            <div className={
                                                item.status === "Processing" ? 'w-3 h-3 mr-2 rounded-full border border-yellow-500 flex flex-row items-center justify-center ' :
                                                item.status === "Dispatched" ? 'w-3 h-3 mr-2 rounded-full border border-blue flex flex-row items-center justify-center ' :
                                                item.status === "Delivered" ? 'w-3 h-3 mr-2 rounded-full border border-green-500 flex flex-row items-center justify-center ' : 
                                                item.status === "Canceled" ? 'w-3 h-3 mr-2 rounded-full border border-red-500 flex flex-row items-center justify-center ' : 
                                                "w-3 h-3 mr-2 rounded-full border border-red-500 flex flex-row items-center justify-center  hidden"
                                            }
                                            
                                            >

                                            <div className=
                                            {
                                                item.status === "Processing" ? 'w-2 h-2 rounded-full bg-yellow-500 ' :
                                                item.status === "Dispatched" ? 'w-2 h-2 rounded-full bg-blue ' :
                                                item.status === "Delivered" ? 'w-2 h-2 rounded-full bg-green-500 ' : 
                                                item.status === "Canceled" ? 'w-2 h-2 rounded-full bg-red-500 ' : "w-2 h-2 rounded-full bg-red-500  hidden"
                                            }
                                            ></div>
                                            </div>

                                            {item?.status}</div>
                                        <div className='w-16p text-black font-bold  text-md'>Amount</div>
                                    </div>
                                )
                            }).reverse()
                        }
                    </div>
            }

            <ToastContainer />
        </div>
    )
}