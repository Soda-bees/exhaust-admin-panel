import React, { useEffect, useState } from 'react'
import { FadeLoader } from 'react-spinners'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { getAllOrders } from '../../services/Api';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/authTokenSlice';
import images from '../../services/images';
import Pagination from '../../component/Pagination';
import { useNavigate } from 'react-router-dom';


export default function Orders() {

    const navigate = useNavigate()

    const authToken = useSelector(selectAuthToken)

    const [loader, setLoader] = useState(false)
    const [allOrders, setAllOrders] = useState([])
    const [statusDropdown, setStatusDropdown] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState('All')

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const filteredOrders = allOrders.filter(item => selectedStatus === 'All' || item.status === selectedStatus).reverse()
    const paginatedOrders = filteredOrders.slice(indexOfFirstProduct, indexOfLastProduct);


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

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleGetAllOrders = async () => {
        try {
            setLoader(true)
            const response = await getAllOrders(authToken)
            if (response.success) {
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

    const handleSelectedStatus = (name) => {
        setSelectedStatus(name)
    }
    return (
        <div className='w-full bg-gray flex flex-col relative'>
            <div
                className='flex items-center justify-between px-6 py-4  '
            >
                <div className='text-black text-xl font-bold'>

                    Orders
                </div>
                <div
                    className='bg-blue w-40 rounded-md px-3 py-2 flex items-center justify-between cursor-pointer active:opacity-50 relative z-20'
                    onClick={() => setStatusDropdown(!statusDropdown)}

                >
                    <div className='text-white'>
                        {selectedStatus === "All" ? 'Filter' : selectedStatus}
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
                                onClick={() => handleSelectedStatus('All')}
                            >All</div>
                            <div
                                className='px-10 hover:bg-gray py-2'
                                onClick={() => handleSelectedStatus('Processing')}
                            >Processing</div>
                            <div
                                className='px-10 hover:bg-gray py-2'
                                onClick={() => handleSelectedStatus('Dispatched')}
                            >Dispatched</div>
                            <div
                                className='px-10 hover:bg-gray py-2'
                                onClick={() => handleSelectedStatus('Delivered')}
                            >Delivered</div>
                            <div
                                className='px-10 hover:bg-gray py-2'
                                onClick={() => handleSelectedStatus('Canceled')}
                            >Canceled</div>
                        </div>
                    }

                </div>
            </div>
            {
                loader ?
                    <div className='w-full absolute top-[40vh]  flex items-center justify-center mb-28'>
                        <FadeLoader size={100} color='#124694' />
                    </div>
                    :
                    <div className='w-90p bg-white mx-auto shadow-lg rounded-md flex flex-col p-6 '
                    >
                        <div className=' flex flex-row items-center gap-3 border-b border-gray pb-4 px-2'>
                            <div className='w-16p text-black font-bold opacity-60 text-md'>Product Name</div>
                            <div className='w-16p text-black font-bold opacity-60 text-md'>Order ID</div>
                            <div className='w-16p text-black font-bold opacity-60 text-md'>Date</div>
                            <div className='w-16p text-black font-bold opacity-60 text-md'>Customer Name</div>
                            <div className='w-16p text-black font-bold opacity-60 text-md'>Status</div>
                            <div className='w-16p text-black font-bold opacity-60 text-md'>Amount</div>
                        </div>
                        {

                            allOrders &&
                            paginatedOrders
                                .map((item, index) => {

                                    return (
                                        <div
                                            className='flex flex-row items-center gap-3 border-b border-gray py-4 hover:bg-gray px-2 rounded-md cursor-pointer active:opacity-60'
                                            onClick={() => navigate(`/orderDetail/${item._id}`, { state: item })}
                                            key={index}
                                        >
                                            <div className='w-16p text-black   text-md'>{item?.products[0]?.product?.name}</div>
                                            <div className='w-16p text-black   text-md'>  {`# ${item._id && item._id.toString().slice(0, 6)}`}</div>
                                            <div className='w-16p text-black   text-md'>
                                                {item.createdAt && new Date(item.createdAt).toLocaleString('en-us', {
                                                    month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'
                                                })}
                                            </div>
                                            <div className='w-16p text-black flex flex-row items-center text-md'>
                                                <img
                                                    src={item?.userData?.profile}
                                                    className='w-8 h-8 rounded-full object-contain mr-2'
                                                />
                                                {item?.userData?.name}</div>
                                            <div className='w-16p text-black   text-md flex items-center justify-start'
                                            >
                                                <div className={
                                                    item.status === "Processing" ? 'w-3 h-3 mr-2 rounded-full border border-yellow flex flex-row items-center justify-center ' :
                                                        item.status === "Dispatched" ? 'w-3 h-3 mr-2 rounded-full border border-blue flex flex-row items-center justify-center ' :
                                                            item.status === "Delivered" ? 'w-3 h-3 mr-2 rounded-full border border-green-500 flex flex-row items-center justify-center ' :
                                                                item.status === "Canceled" ? 'w-3 h-3 mr-2 rounded-full border border-red-500 flex flex-row items-center justify-center ' :
                                                                    "w-3 h-3 mr-2 rounded-full border border-red-500 flex flex-row items-center justify-center  hidden"
                                                }

                                                >

                                                    <div className=
                                                        {
                                                            item.status === "Processing" ? 'w-2 h-2 rounded-full bg-yellow ' :
                                                                item.status === "Dispatched" ? 'w-2 h-2 rounded-full bg-blue ' :
                                                                    item.status === "Delivered" ? 'w-2 h-2 rounded-full bg-green-500 ' :
                                                                        item.status === "Canceled" ? 'w-2 h-2 rounded-full bg-red-500 ' : "w-2 h-2 rounded-full bg-red-500  hidden"
                                                        }
                                                    ></div>
                                                </div>

                                                {item?.status}</div>
                                            <div className='w-16p text-black   text-md'>
                                                {`$ ${item?.paid + item?.shipping}.00`}
                                            </div>
                                        </div>
                                    )
                                })
                        }
                        {allOrders &&
                            filteredOrders
                                .filter(item => selectedStatus === 'All' || item.status === selectedStatus)
                                .length === 0 && (
                                <div className='text-center py-4 font-semibold mt-2'>
                                    No results found for the selected status.
                                </div>
                            )}
                    </div>
            }
            <div className=' fixed bottom-10 left-15p '>
                <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredOrders.length / productsPerPage)} onPageChange={handlePageChange} />

            </div>
            <ToastContainer />
        </div>
    )
}