import React, { useState } from 'react'
import images from '../../services/images'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { FadeLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/authTokenSlice';
import axios from 'axios';
import { addProduct, uploadBrandLogo, uploadProductsImages, uploadSound } from '../../services/Api';
import Swal from 'sweetalert2';


export default function AddProduct() {
    const [brandLogo, setBrandLogo] = useState(null)
    const [selectedSound, setSelectedSound] = useState(null);
    const [loader, setLoader] = useState(false)
    const [productsImages, setProductsImages] = useState()
    const [name, setName] = useState('')
    const [price, setPrice] = useState()
    const [quantity, setQuantity] = useState()
    const [brandName, setBrandName] = useState('')
    const [description, setDescription] = useState('')

    const authToken = useSelector(selectAuthToken)

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

    const handleUploadBrandLogo = async (e) => {
        try {
            setLoader(true)
            const selectedFile = e.target.files[0];
            if (selectedFile && selectedFile.type === 'image/png') {

                const formData = new FormData();
                formData.append('image', selectedFile);
                const response = await uploadBrandLogo(formData, authToken)
                if (response.success) {
                    setLoader(false)
                    setBrandLogo(response.url)
                } else {
                    setLoader(false)
                    notify(response.message)
                }
            } else {
                notify('Please select a valid PNG image.')
                setLoader(false)
            }
        } catch (error) {
            setLoader(false)
            console.log(error);
            notify(error.message)
        }
    };

    const handleSoundUpload = async (e) => {
        try {
            setLoader(true)
            const soundFile = e.target.files[0];
            const formData = new FormData();
            formData.append('sound', soundFile);
            const response = await uploadSound(formData, authToken);
            if (response.success) {
                setSelectedSound(response.url)
                setLoader(false)
            } else {
                setLoader(false)
                notify(response.message)
            }
        } catch (error) {
            setLoader(false)
            console.log(error);
            notify(error.message)
        }
    };

    const handleUploadProductsImages = async (e) => {
        try {
            setLoader(true)
            const selectedFile = e.target.files;
            if (selectedFile.length <= 10) {
                const formData = new FormData();
                for (let i = 0; i < selectedFile.length; i++) {
                    formData.append('images', selectedFile[i]);
                }
                const response = await uploadProductsImages(formData, authToken);
                if (response.success) {
                    setProductsImages(response.images)
                    setLoader(false)
                } else {
                    setLoader(false)
                    notify(response.message)
                }
            } else {
                setLoader(false)
                notify('You can only upload up to 10 images.')
            }
        } catch (error) {
            setLoader(false)
            console.log(error);
            notify(error.message)
        }
    }

    const handleAddProduct = async () => {
        try {
            const obj = {
                images: productsImages,
                brand: {
                    name: brandName,
                    logo: brandLogo,
                },
                description,
                name,
                price,
                quantity,
                sound: selectedSound
            }
            setLoader(true)
            const response = await addProduct(authToken, obj)
            if (response.success) {
                setLoader(false)
                setName('')
                setQuantity()
                setPrice()
                setBrandName('')
                setBrandLogo()
                setSelectedSound()
                setDescription('')
                setProductsImages()
                Swal.fire({
                    title: "Congratulation!",
                    text: "Your product has been added successfully!",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: '#124694', 
                    confirmButtonText: 'Done',
                    buttonsStyling: true,
                });
            } else {
                setLoader(false)
                notify(response.message)
            }
        } catch (error) {
            setLoader(false)
            notify(error.message)
        }
    }
    return (
        <div className='w-full bg-gray flex flex-col relative'>
            <div
                className='flex items-center justify-between px-6 py-4  text-black text-xl font-bold'
            >
                Add new product
            </div>
            {
                loader ?
                    <div className='w-full absolute top-[40vh]  flex items-center justify-center mb-28'>
                        <FadeLoader size={100} color='#124694' />
                    </div>
                    :
                    <div className=' w-90p bg-white mx-auto shadow-lg rounded-md flex flex-row gap-20 p-6'>
                        <div className='w-1/2 flex-1'>
                            <div className='flex flex-col'>
                                <div className='text-md font-bold'>
                                    Product Name
                                </div>
                                <input
                                    type='text'
                                    placeholder='Enter Product Name'
                                    className=' w-full focus:outline-none p-1 border-2 border-gray rounded-md pl-2 mt-2'
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </div>
                            <div className='flex flex-col mt-3'>
                                <div className='text-md font-bold'>
                                    Stock Quantity
                                </div>
                                <input
                                    type='number'
                                    placeholder='Enter Quantity'
                                    className=' w-full focus:outline-none p-1 border-2 border-gray rounded-md pl-2 mt-2'
                                    onChange={(e) => setQuantity(e.target.value)}
                                    value={quantity}
                                />
                            </div>
                            <div className='flex flex-col mt-3'>
                                <div className='text-md font-bold'>
                                    Price
                                </div>
                                <input
                                    type='number'
                                    placeholder='Enter Price'
                                    className=' w-full focus:outline-none p-1 border-2 border-gray rounded-md pl-2 mt-2'
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                />
                            </div>
                            <div className='flex flex-col mt-3'>
                                <div className='text-md font-bold'>
                                    Brand Name
                                </div>
                                <input
                                    type='text'
                                    placeholder='Enter Brand Name'
                                    className=' w-full focus:outline-none p-1 border-2 border-gray rounded-md pl-2 mt-2'
                                    onChange={(e) => setBrandName(e.target.value)}
                                    value={brandName}
                                />
                            </div>
                            <div className='flex flex-col mt-3'>
                                <div className='text-md font-bold'>
                                    Brand Logo
                                </div>
                                <label htmlFor='fileInput'
                                    className='active:opacity-50 mt-2 text-md font-bold cursor-pointer w-full h-[150px] flex items-center justify-center border-2 border-dashed border-gray rounded-md'>
                                    {
                                        brandLogo ?
                                            <img src={brandLogo} className=''
                                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                                            />
                                            :
                                            <div className=' w-full flex flex-col items-center'>
                                                <img src={images.uploadImg} className='w-7' />
                                                <div className='text-center text-sm'>Upload brand logo here,<br /> png are allowed</div>
                                            </div>
                                    }
                                </label>
                                <input
                                    id='fileInput'
                                    type='file'
                                    placeholder='Enter Brand Name'
                                    className=' w-full focus:outline-none p-1 border-2 border-gray rounded-md pl-2 mt-2 hidden'
                                    onChange={handleUploadBrandLogo}
                                    accept='.png'
                                />
                            </div>
                            <div className='flex flex-col mt-3'>
                                <div className='text-md font-bold'>
                                    Upload Sound
                                </div>
                                {
                                    selectedSound &&

                                    <div className='w-full mt-2'>
                                        <audio controls
                                            className='w-full h-10'
                                        >
                                            <source src={selectedSound} type="audio/mp3" />
                                            Your browser does not support the audio tag.
                                        </audio>
                                    </div>
                                }
                                <label htmlFor='soundUpload'
                                    className='mt-2 active:opacity-50 text-md font-bold cursor-pointer w-full flex items-center justify-center border-2 border-gray rounded-md py-2 bg-gray'>
                                    <img src={images.soundUpload} className='w-6 ' />
                                    Upload Sound
                                </label>
                                <input
                                    id='soundUpload'
                                    type='file'
                                    className=' w-4/5 focus:outline-none p-1 border-2 border-gray rounded-md pl-2 mt-2 hidden'
                                    onChange={handleSoundUpload}
                                    accept=".mp3"
                                />
                            </div>
                        </div>
                        <div className='w-1/2 flex flex-col justify-between '>
                            <div className=''>

                                <div className='flex flex-col'>
                                    <div className='text-md font-bold'>
                                        Description
                                    </div>
                                    <textarea
                                        type='text'
                                        placeholder='Enter Description'
                                        className=' w-full h-[120px] focus:outline-none p-1 border-2 border-gray rounded-md pl-2 mt-2 resize-none'
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                    ></textarea>
                                </div>
                                <div className='flex flex-col mt-3'>
                                    <div className='text-md font-bold'>
                                        Product Images
                                    </div>
                                    <label htmlFor='productsImg'
                                        className='mt-2 active:opacity-50 text-md font-bold cursor-pointer w-full flex items-center justify-center border-2 border-gray rounded-md py-2 bg-gray'>
                                        <img src={images.uploadImages} className='w-5 mr-2' />
                                        Upload Product Images
                                    </label>
                                    <input
                                        id='productsImg'
                                        type='file'
                                        className=' w-4/5 focus:outline-none p-1 border-2 border-gray rounded-md pl-2 mt-2 hidden'
                                        onChange={handleUploadProductsImages}
                                        accept='.png'
                                        multiple
                                    />
                                </div>
                                {
                                    productsImages &&
                                    <div className=' flex flex-wrap mt-3'>
                                        {
                                            productsImages.map((item, index) => {
                                                return (
                                                    <img src={item} key={index}
                                                        className=' w-20 h-20 ml-2 mt-2'
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </div>

                            <div className='flex items-center'>
                                <div
                                    className='bg-blue text-white text-lg font-semibold px-7 py-3 rounded-md cursor-pointer active:opacity-50'
                                    onClick={handleAddProduct}
                                >
                                    Add Product
                                </div>
                            </div>
                        </div>
                    </div>
            }

            <ToastContainer />
        </div>
    )
}
