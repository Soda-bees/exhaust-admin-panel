import React, { useState } from 'react'
import images from '../../services/images'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData, setUserData } from '../../store/userSlice';
import { selectAuthToken, setAuthToken } from '../../store/authTokenSlice';
import { BeatLoader, DotLoader, FadeLoader, HashLoader, MoonLoader } from 'react-spinners';
import { signin } from '../../services/Api';
import axios from 'axios';
import apiInstance from '../../services/ApiInstance';

export default function Signin() {

    const dispatch = useDispatch()

    const [loader, setLoader] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)

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

    const handleSignin = async () => {
        try {
            const obj = {
                email,
                password
            }
            setLoader(true)
            const response = await signin(obj)
            if (response.success) {
                setLoader(false)
                const adminData = response.adminData
                const token = response.token
                dispatch(setUserData(adminData))
                dispatch(setAuthToken(token))
            } else {
                setLoader(false)
                notify(response.message)
            }
        } catch (error) {
            notify(error.message)
            console.log(error);
            setLoader(false)
        }
    }


    return (
        <div className='w-full h-[100vh] flex relative '>
            <div className='w-40p h-full bg-white flex items-center justify-end'>
                <img src={images.signinImg} className='w-60p h-[60vh]' />
            </div>
            <div className='w-60p h-full bg-blue flex items-center'>
                <div className='bg-white w-60p h-[60vh] flex items-center justify-center'>
                    <div className='w-50p flex flex-col pb-20'>
                        <img src={images.sigiinLogo} className='w-80p' />
                        <div className='text-black font-bold text-2xl mt-10'>Signin</div>
                        <input type='text' placeholder='Email'
                            className='w-full mt-5 pl-2 focus:outline-none p-1 border-2 border-gray-500 rounded-md'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <div className='relative flex '>
                            <input type={showPass ? "text" : "password"} placeholder='Password'
                                className='w-full mt-5 pl-2 focus:outline-none p-1 border-2 border-gray-500 rounded-md'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <img src={showPass ? images.eyeHide : images.eyeShow} className='w-4 h-3 absolute right-3 bottom-3 cursor-pointer'
                                onClick={() => setShowPass(!showPass)}
                            />
                        </div>
                        <div className='text-black opacity-50 text-xs cursor-pointer active:opacity-75 font-extrabold underline self-end mt-2'>Forgot password?</div>
                        <div
                            onClick={handleSignin}
                            className='font-semibold flex bg-blue w-full mt-10 py-2 flex-row items-center justify-between px-4 text-white rounded-md cursor-pointer active:opacity-50'>
                            Signin
                            <img src={images.signinArrow} className='w-5' />
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            {
                loader &&
                <div className='absolute w-full h-[100vh] flex items-center justify-center bg-disable'>
                    <FadeLoader size={100} color='#124694' />
                </div>
            }
        </div>
    )
}
