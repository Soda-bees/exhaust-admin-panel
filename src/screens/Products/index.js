import React, { useEffect, useState } from 'react'
import { FadeLoader } from 'react-spinners'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { deleteProduct, getAllProducts } from '../../services/Api';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/authTokenSlice';
import images from '../../services/images';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../component/Pagination';


export default function Products() {

    const navigate = useNavigate()

    const authToken = useSelector(selectAuthToken)

    const [loader, setLoader] = useState(false)
    const [allProducts, setAllProducts] = useState([])
    const [indexArray, setIndexArray] = useState()

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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
        setIndexArray((prevIndex) => {
            if (index === prevIndex) {
                return null;
            } else {
                return index;
            }
        });
    };

    const handleDelete = async (_id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    setLoader(true)
                    const response = await deleteProduct(_id, authToken)
                    if (response.success) {
                        const updatedProducts = allProducts.filter((product) => product._id !== _id);
                        setAllProducts(updatedProducts);
                        setLoader(false)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your product has been deleted.",
                            icon: "success"
                        });
                    } else {
                        setLoader(false)
                        notify(response.message)
                    }
                }
            });
        } catch (error) {
            setLoader(false)
            console.log(error.message);
            notify(error.message)
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='w-full relative pb-5 '>
            <div className='flex items-center justify-between px-5 pt-4 text-black text-xl font-bold'>
                All Products
                <div className='bg-blue text-white text-sm font-semibold px-4 py-2 rounded-md flex items-center justify-center cursor-pointer active:opacity-50'
                    onClick={() => navigate('/addProduct')}
                >
                    <img src={images.add} className='w-4 mr-2' />
                    Add new product
                </div>
            </div>
            {
                loader ?
                    <div className='w-full absolute top-[40vh] flex items-center justify-center'>
                        <FadeLoader size={100} color='#124694' />
                    </div>
                    :
                    <div className='px-5 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
                        {allProducts &&
                            currentProducts.map((item, index) => {
                                console.log(item.quantity);
                                return (
                                    <div key={index} className='bg-white p-2 rounded-md shadow-md relative'>
                                        {
                                            item.quantity < 10 &&
                                            <div
                                                className='w-2 h-2 bg-red-500 rounded-full absolute left-0 top-[0px]'
                                            ></div>
                                        }
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
                                                        <div className='bg-white absolute right-2 flex flex-col shadow-lg rounded-md py-2'>
                                                            <div
                                                                className='bg-white px-6 py-1  hover:bg-gray cursor-pointer active:opacity-50'
                                                                onClick={() => navigate(`/productDetail/${item._id}`, { state: item })}
                                                            >View</div>
                                                            <div
                                                                className='bg-white px-6 py-1  hover:bg-gray cursor-pointer active:opacity-50'
                                                                onClick={() => navigate(`/updateProduct/${item._id}`, { state: item })}
                                                            >Update</div>
                                                            <div
                                                                className='bg-white px-6 py-1  hover:bg-gray cursor-pointer active:opacity-50'
                                                                onClick={() => {
                                                                    setIndexArray()
                                                                    handleDelete(item._id)
                                                                }}
                                                            >Delete</div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className='font-bold mt-5'>Description</div>
                                        <div
                                            className='text-sm'
                                            style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', WebkitLineClamp: 1 }}
                                        >
                                            {item.description}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
            }
            <div className=' fixed bottom-10 left-15p '>
                <Pagination currentPage={currentPage} totalPages={Math.ceil(allProducts.length / productsPerPage)} onPageChange={handlePageChange} />
            </div>
            <ToastContainer />
        </div>
    )
}
