import React, { useEffect, useState } from 'react'
import images from '../../services/images'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { FadeLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/authTokenSlice';
import { addProduct, updateOrderStatus, uploadBrandLogo, uploadProductsImages, uploadSound } from '../../services/Api';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import countryData from 'country-data';
import socket from '../../services/Socket';




export default function OrderDetail() {



    const location = useLocation();
    const navigate = useNavigate()

    const authToken = useSelector(selectAuthToken)

    const [loader, setLoader] = useState(false)
    const [orderId, setOrderId] = useState('')
    const [status, setStatus] = useState('')
    const [date, setDate] = useState('')
    const [selectedStatus, setSelectedStatus] = useState('')
    const [statusDropdown, setStatusDropdown] = useState(false)
    const [customerInfo, setCustomerInfo] = useState()
    const [shippingAddress, setShippingAddress] = useState()
    const [product, setProduct] = useState()
    const [shipping, setShipping] = useState()
    const [total, setTotal] = useState()
    const [subTotal, setSubTotal] = useState()


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

    useEffect(() => {
        if (location.state) {
            setOrderId(location.state?._id)
            setStatus(location?.state?.status)
            setSelectedStatus(location?.state?.status)
            setDate(location?.state?.createdAt)
            setCustomerInfo(location?.state?.userData)
            setShippingAddress(location?.state?.shippingAddress)
            setProduct(location?.state?.products)
            setShipping(location?.state?.shipping)
            setTotal(location?.state?.paid)
            setSubTotal(location?.state?.shipping + location?.state?.paid)
        }
    }, [location.state])

    const handleSelectedStatus = (name) => {
        setSelectedStatus(name)
    }

    const handlePrint = () => {
        const printContent = document.getElementById('print-content');

        if (printContent) {
            const originalContents = document.body.innerHTML;
            document.body.innerHTML = printContent.innerHTML;
            window.print();
            document.body.innerHTML = originalContents;
        } else {
            console.error("Element with id 'print-content' not found.");
        }
    }

    const handleUpdateStatus = async () => {

        socket.emit('statusUpdate' , {
            _id:orderId,
            status:selectedStatus
        })
        // try {
        //     setLoader(true)
        //     const obj = {
        //         orderId,
        //         status: selectedStatus
        //     }
        //     const response = await updateOrderStatus(authToken, obj)
        //     if (response.success) {
        //         setLoader(false)
        //         setStatus(response.updatedOrder.status)
        //         setSelectedStatus(response.updatedOrder.status)
        //         Swal.fire({
        //             title: "Congratulation!",
        //             text: "Product status has been updated successfully!",
        //             icon: "success",
        //             showCancelButton: false,
        //             confirmButtonColor: '#124694',
        //             confirmButtonText: 'Done',
        //             buttonsStyling: true,
        //         })
        //     } else {
        //         setLoader(false)
        //         notify(response.message)
        //     }
        // } catch (error) {
        //     setLoader(false)
        //     notify(error.message)
        // }
    }

    const getInternationalDialingCode = (countryCode) => {
        try {
            const country = countryData.lookup.countries({ alpha2: countryCode });
            const dialingCode = country && country[0]?.countryCallingCodes[0];
            return dialingCode ? `${dialingCode}` : 'N/A';
        } catch (error) {
            console.error(`Error getting dialing code for country code ${countryCode}: ${error.message}`);
            return 'N/A';
        }
    };

    return (
        <div
            id="print-content"
            className='w-full bg-gray flex flex-col relative'
        >
            <div
                className='flex items-center justify-between px-6 py-4  text-black text-xl font-bold'
            >
                Order Details
            </div>
            {
                loader ?
                    <div className='w-full absolute top-[40vh]  flex items-center justify-center mb-28'>
                        <FadeLoader size={100} color='#124694' />
                    </div>
                    :
                    <div className='gap-2 flex flex-col'>
                        <div className=' w-90p bg-white mx-auto shadow-lg rounded-md flex flex-col items-start gap-4 p-6' >
                            <div
                                className=' flex flex-row items-center justify-center'
                            >
                                <div
                                    className='font-bold'
                                >
                                    {`Order ID: # ${orderId.toString().slice(0, 6)}`}
                                </div>
                                <div
                                    className={
                                        status === 'Processing' ? "bg-yellow ml-3 rounded-md px-2 text-md font-semibold text-white" :
                                            status === 'Dispatched' ? "bg-blue ml-3 rounded-md px-2 text-md font-semibold text-white" :
                                                status === 'Delivered' ? "bg-green-500 ml-3 rounded-md px-2 text-md font-semibold text-white" :
                                                    status === 'Canceled' ? "bg-red-500 ml-3 rounded-md px-2 text-md font-semibold text-white" : ""
                                    }
                                // 'bg-yellow ml-3 rounded-md px-2 text-md font-semibold'
                                >{status}</div>
                            </div>
                            <div
                                className='w-full flex flex-row items-center justify-between'
                            >
                                <div>
                                    {date && new Date(date).toLocaleString('en-us', {
                                        month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'
                                    })}
                                </div>
                                <div
                                    className='flex flex-row items-center gap-2'
                                >
                                    {
                                        status !== "Delivered" && status !== "Canceled" &&
                                        <div
                                            className='bg-blue w-40 rounded-md px-3 py-2 flex items-center justify-between cursor-pointer active:opacity-50 relative z-20'
                                            onClick={() => setStatusDropdown(!statusDropdown)}

                                        >
                                            <div className='text-white text-md'>
                                                {selectedStatus}
                                            </div>
                                            <img
                                                src={images.arrowBtm}
                                                className={`w-4 ${statusDropdown ? 'transition-transform transform rotate-180' : 'transition-transform transform '} `}
                                            />
                                            {
                                                statusDropdown &&

                                                <div
                                                    className='bg-white absolute top-10 right-0 shadow-lg rounded-md transition-duration-300 translate-y-2'
                                                >
                                                    <div
                                                        className='px-10 hover:bg-gray py-2'
                                                        onClick={() => handleSelectedStatus('Dispatched')}
                                                    >Dispatched</div>
                                                    <div
                                                        className='px-10 hover:bg-gray py-2'
                                                        onClick={() => handleSelectedStatus('Delivered')}
                                                    >Delivered</div>
                                                </div>
                                            }

                                        </div>
                                    }
                                    <div
                                        onClick={() => selectedStatus !== status && handleUpdateStatus()}
                                        className={
                                            selectedStatus === status ?
                                                "text-black font-semibold text-md bg-disable px-3 py-2 rounded-md"
                                                :
                                                "text-white text-md bg-blue px-3 py-2 rounded-md cursor-pointer"
                                        }
                                    >
                                        Save
                                    </div>
                                </div>
                            </div>
                            <div className=' w-full flex flex-row items-center '>
                                <div className='w-1/2 '>
                                    <div
                                        className='font-bold'
                                    >Customer Info</div>
                                    <div
                                        className='flex flex-row gap-2'
                                    >
                                        <div>
                                            <div
                                                className='text-md font-bold ml-1 mt-2'
                                            >Name</div>
                                            <div
                                                className='p-3 bg-disable2 rounded-md'
                                            >{customerInfo?.name}</div>
                                        </div>
                                        <div>
                                            <div
                                                className='text-md font-bold ml-1 mt-2'
                                            >Email</div>
                                            <div
                                                className='p-3 bg-disable2 rounded-md'
                                            >{customerInfo?.email}</div>
                                        </div>
                                        <div>
                                            <div
                                                className='text-md font-bold ml-1 mt-2'
                                            >Phone</div>
                                            <div
                                                className='p-3 bg-disable2 rounded-md'
                                            >{`${getInternationalDialingCode(customerInfo?.countryCode)} ${customerInfo?.number}`}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-1/2 '>
                                    <div
                                        className='font-bold'
                                    >Deliver To</div>
                                    <div
                                        className='flex flex-row gap-2'
                                    >
                                        <div>
                                            <div
                                                className='text-md font-bold ml-1 mt-2'
                                            >Address</div>
                                            <div
                                                className='p-3 bg-disable2 rounded-md'
                                            >{`${shippingAddress?.address}, ${shippingAddress?.city}, ${shippingAddress?.country}, ${shippingAddress?.zipCode}`}</div>
                                        </div>
                                        <div>
                                            <div
                                                className='text-md font-bold ml-1 mt-2'
                                            >Phone</div>
                                            <div
                                                className='p-3 bg-disable2 rounded-md'
                                            >{`${getInternationalDialingCode(shippingAddress?.countryCode)} ${shippingAddress?.number}`}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=' w-90p bg-white mx-auto shadow-lg rounded-md flex flex-col items-start gap-4 p-6' >
                            <div
                                className='border-b border-disable w-full pb-2'
                            >
                                <div
                                    className='font-bold'
                                >
                                    Products
                                </div>
                            </div>
                            <div
                                className='w-full gap-2 flex flex-row border-b border-gray pb-2 px-2'
                            >
                                <div className='bg-white-500 w-20p text-black font-bold opacity-60 text-md'>Image</div>
                                <div className='bg-white-500 w-20p text-black font-bold opacity-60 text-md'>Product Name</div>
                                <div className='bg-white-500 w-20p text-black font-bold opacity-60 text-md'>Product ID</div>
                                <div className='bg-white-500 w-20p text-black font-bold opacity-60 text-md'>Brand</div>
                                <div className='bg-white-500 w-20p text-black font-bold opacity-60 text-md '>Quantity</div>
                                <div className='bg-white-500 w-10p text-black font-bold opacity-60 text-md text-end'>Price</div>
                            </div>
                            {
                                product &&
                                product.map((item, index) => {
                                    return (
                                        <div
                                            className='w-full gap-2 flex flex-row border-b border-gray pb-2 px-2'
                                        >
                                            <div className='bg-white-500 w-20p text-black  text-md'>
                                                <img src={item?.product?.images[0]}
                                                    className='w-10 h-10 object-contain'
                                                />
                                            </div>
                                            <div className='bg-white-500 w-20p text-black  text-md'>
                                                {item?.product?.name}
                                            </div>
                                            <div className='bg-white-500 w-20p text-black  text-md'>
                                                {`# ${item?.product?._id.toString().slice(0, 6)}`}
                                            </div>
                                            <div className='bg-white-500 w-20p text-black  text-md flex flex-row items-center'>
                                                <img
                                                    src={item?.product?.brand?.logo}
                                                    className='w-5 h-5 mr-3'
                                                />
                                                {item?.product?.brand?.name}
                                            </div>
                                            <div className='bg-white-500 w-20p text-black  text-md'>
                                                {item?.qty}
                                            </div>
                                            <div className='bg-white-500 w-10p text-black font-bold opacity-60 text-md text-end'>
                                                {`$ ${item?.product?.price}.00`}
                                            </div>

                                        </div>
                                    )
                                })
                            }
                            <div
                                className='self-end w-20p'
                            >
                                <div 
                                className='flex flex-row items-center justify-between '
                                >
                                    <div>
                                        Shipping charges
                                    </div>
                                    <div 
                                    className='font-semibold'
                                    >
                                        {`$ ${shipping}.00`}
                                    </div>
                                </div>
                                <div 
                                className='flex flex-row items-center justify-between '
                                >
                                    <div>
                                        Total
                                    </div>
                                    <div 
                                    className='font-semibold'
                                    >
                                        {`$ ${total}.00`}
                                    </div>
                                </div>
                                <div 
                                className='flex flex-row items-center justify-between '
                                >
                                    <div>
                                        Sub Total
                                    </div>
                                    <div 
                                    className='font-semibold'
                                    >
                                        {`$ ${subTotal}.00`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

            }

            <ToastContainer />
        </div>
    )
}
