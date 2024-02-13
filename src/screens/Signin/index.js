import React, { useState } from 'react'
import images from '../../services/images'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData, setUserData } from '../../store/userSlice';
import { selectAuthToken, setAuthToken } from '../../store/authTokenSlice';
import { BeatLoader, DotLoader, FadeLoader, HashLoader, MoonLoader } from 'react-spinners';
import { forgotPassword, resetPassword, signin } from '../../services/Api';
import axios from 'axios';
import OtpInput from 'react-otp-input';
import Swal from 'sweetalert2';

export default function Signin() {

    const dispatch = useDispatch()

    const [loader, setLoader] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [forgotPassEmail, setForgotPassEmail] = useState('')
    const [showPage, setShowPage] = useState('signin')
    const [otp, setOtp] = useState()
    const [userGivenOtp, setUserGivenOtp] = useState()
    const [resetPass, setResetPass] = useState()
    const [confirmResetPass, setConfirmResetPass] = useState()
    const [resetPassEye, setResetPassEye] = useState(false)
    const [confirmResetPassEye, setConfirmResetPassEye] = useState(false)

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

    const handleForgotPass = async () => {
        try {
            setLoader(true)
            const response = await forgotPassword(forgotPassEmail)
            if (response.success) {
                setOtp(response.otp)
                setLoader(false)
                setShowPage('OTP')
            } else {
                setLoader(false)
                notify(response.message)
            }
        } catch (error) {
            setLoader(false)
            notify(error.message)
        }
    }

    const handleChangeShowPage = async (name) => {
        setShowPage(name)
    }

    const handleCheckOtp = async () => {
        if (userGivenOtp === otp) {
            setShowPage('ResetPass')
        } else {
            notify('Invalid OTP')
        }
    }

    const handleResetPass = async () => {
        try {
            if (resetPass === confirmResetPass) {
                const obj = {
                    email: forgotPassEmail,
                    password: resetPass
                }
                setLoader(true)
                const response = await resetPassword(obj)
                if (response.success) {
                    setLoader(false)
                    setEmail('')
                    setPassword('')
                    setForgotPassEmail('')
                    setResetPass('')
                    setConfirmResetPass('')
                    Swal.fire({
                        title: "Congratulation!",
                        text: "Your password has been updated successfully!",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonColor: '#124694',
                        confirmButtonText: 'Done',
                        buttonsStyling: true,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setShowPage('signin')
                        }
                    });
                } else {
                    setLoader(false)
                    notify(response.message)
                }
            } else {
                notify('Password not match')
            }

        } catch (error) {
            setLoader(false)
            notify(error.message)
        }
    }
    return (
        <div className='w-full h-[100vh] flex relative '>
            <div className='w-40p h-full bg-white flex items-center justify-end'>
                <img src={images.signinImg} className='w-60p h-[60vh]' />
            </div>
            <div className='w-60p h-full bg-blue flex items-center'>
                <div className='bg-white w-60p h-[60vh] flex items-center justify-center'>
                    {
                        showPage === "signin" ?
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
                                <div className='text-black opacity-50 text-xs cursor-pointer active:opacity-75 font-extrabold underline self-end mt-2'
                                    onClick={() => handleChangeShowPage('forgotPass')}
                                >Forgot password?</div>
                                <div
                                    onClick={handleSignin}
                                    className='font-semibold flex bg-blue w-full mt-10 py-2 flex-row items-center justify-between px-4 text-white rounded-md cursor-pointer active:opacity-50'>
                                    Signin
                                    <img src={images.signinArrow} className='w-5' />
                                </div>
                            </div> :
                            showPage === "forgotPass" ?
                                <div className='w-50p flex flex-col pb-20'>
                                    <img src={images.sigiinLogo} className='w-80p' />
                                    <div className='text-black font-bold text-2xl mt-10'>Forgot password</div>
                                    <input type='text' placeholder='Enter Email'
                                        className='w-full mt-5 pl-2 focus:outline-none p-1 border-2 border-gray-500 rounded-md'
                                        onChange={(e) => setForgotPassEmail(e.target.value)}
                                        value={forgotPassEmail}
                                    />

                                    <div className='text-black opacity-50 text-xs cursor-pointer active:opacity-75 font-extrabold underline self-end mt-2'
                                        onClick={() => handleChangeShowPage('signin')}
                                    >Sign In</div>
                                    <div
                                        onClick={handleForgotPass}
                                        className='font-semibold flex bg-blue w-full mt-10 py-2 flex-row items-center justify-between px-4 text-white rounded-md cursor-pointer active:opacity-50'>
                                        Next
                                        <img src={images.signinArrow} className='w-5' />
                                    </div>
                                </div> :
                                showPage === "OTP" ?
                                    <div className='w-50p flex flex-col pb-20'>
                                        <img src={images.sigiinLogo} className='w-80p' />
                                        <div className='text-black font-bold text-2xl mt-10'>Enter OTP</div>
                                        <OtpInput
                                            value={userGivenOtp}
                                            onChange={setUserGivenOtp}
                                            numInputs={4}
                                            renderSeparator={<span> - </span>}
                                            renderInput={(props) => <input {...props}
                                                className='bg-white h-8 rounded-md shadow-md  border-2 border-gray-500 text-center font-semibold '
                                                style={{ width: '30px' }}
                                            />}
                                            containerStyle='h-10 flex items-center justify-between mt-5 w-60p self-center'
                                        />
                                        <div
                                            onClick={handleCheckOtp}
                                            className='font-semibold flex bg-blue w-full mt-10 py-2 flex-row items-center justify-between px-4 text-white rounded-md cursor-pointer active:opacity-50'>
                                            Continue
                                            <img src={images.signinArrow} className='w-5' />
                                        </div>
                                    </div> :
                                    showPage === "ResetPass" &&
                                    <div className='w-50p flex flex-col pb-20'>
                                        <img src={images.sigiinLogo} className='w-80p' />
                                        <div className='text-black font-bold text-2xl mt-10'>Reset Password</div>
                                        <div className='relative flex '>
                                            <input type={resetPassEye ? "text" : "password"} placeholder='Password'
                                                className='w-full mt-5 pl-2 focus:outline-none p-1 border-2 border-gray-500 rounded-md'
                                                onChange={(e) => setResetPass(e.target.value)}
                                                value={resetPass}
                                            />
                                            <img src={resetPassEye ? images.eyeHide : images.eyeShow} className='w-4 h-3 absolute right-3 bottom-3 cursor-pointer'
                                                onClick={() => setResetPassEye(!resetPassEye)}
                                            />
                                        </div>
                                        <div className='relative flex '>
                                            <input type={confirmResetPassEye ? "text" : "password"} placeholder='Confirm Password'
                                                className='w-full mt-5 pl-2 focus:outline-none p-1 border-2 border-gray-500 rounded-md'
                                                onChange={(e) => setConfirmResetPass(e.target.value)}
                                                value={confirmResetPass}
                                            />
                                            <img src={confirmResetPassEye ? images.eyeHide : images.eyeShow} className='w-4 h-3 absolute right-3 bottom-3 cursor-pointer'
                                                onClick={() => setConfirmResetPassEye(!confirmResetPassEye)}
                                            />
                                        </div>
                                        <div
                                            onClick={handleResetPass}
                                            className='font-semibold flex bg-blue w-full mt-10 py-2 flex-row items-center justify-between px-4 text-white rounded-md cursor-pointer active:opacity-50'>
                                            Continue
                                            <img src={images.signinArrow} className='w-5' />
                                        </div>
                                    </div>
                    }

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
