import React, { useState } from 'react'
import images from '../../services/images'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { FadeLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/authTokenSlice';
import axios from 'axios';
import Swal from 'sweetalert2';


export default function UpdateProfile() {
    const [loader, setLoader] = useState(false)
    const [tabName, setTabName] = useState('profile')

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

    const handleChangeTab = (name) => {
        setTabName(name)
    }
    return (
        <div className='w-full bg-gray flex flex-col relative'>
            <div
                className='flex items-center justify-between'
            >
                <div
                className='flex flex-row'
                >
                    <div 
                    onClick={() => handleChangeTab('profile')}
                    className={tabName === "profile" ? "px-6 py-4  text-black text-lg font-bold cursor-pointer" : "px-6 py-4  text-black opacity-50 text-lg font-bold cursor-pointer"}>
                        Update Profile
                    </div>
                    <div 
                    onClick={() => handleChangeTab('changePass')}
                    className={tabName === "changePass" ? "px-6 py-4  text-black text-lg font-bold cursor-pointer" : "px-6 py-4  text-black opacity-50 text-lg font-bold cursor-pointer"}>
                        Change Password
                    </div>
                </div>
            </div>
            {
                loader ?
                    <div className='w-full absolute top-[40vh]  flex items-center justify-center mb-28'>
                        <FadeLoader size={100} color='#124694' />
                    </div>
                    :
                    <div className=' w-90p bg-white mx-auto shadow-lg rounded-md flex flex-row gap-20 p-6'>
                        {
                            tabName === "profile" ?
                                <div>
                                    update profile
                                </div>
                                :
                                <div>
                                    change pass
                                </div>
                        }
                    </div>
            }

            <ToastContainer />
        </div>
    )
}
