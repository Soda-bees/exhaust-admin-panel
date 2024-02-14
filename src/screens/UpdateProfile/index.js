import React, { useEffect, useState } from 'react'
import images from '../../services/images'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { FadeLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/authTokenSlice';
import axios from 'axios';
import Swal from 'sweetalert2';
import { selectUserData, setUserData } from '../../store/userSlice';
import { changePassword, updateProfile, uploadProfile } from '../../services/Api';


export default function UpdateProfile() {

    const dispatch = useDispatch()

    const [loader, setLoader] = useState(false)
    const [profile, setProfile] = useState()
    const [name, setName] = useState('')
    const [oldPass, setOldPass] = useState('')
    const [oldPassEye, setOldPassEye] = useState(false)
    const [newPass, setNewPass] = useState('')
    const [newPassEye, setNewPassEye] = useState(false)
    const [confirmNewPass, setConfirmNewPass] = useState('')
    const [confirmNewPassEye, setConfirmNewPassEye] = useState(false)

    const authToken = useSelector(selectAuthToken)
    const userData = useSelector(selectUserData)

    useEffect(() => {
        setProfile(userData?.profile)
        setName(userData.name)
    }, [userData])

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

    const handleUploadProfile = async (e) => {
        try {
            setLoader(true)
            const selectedFile = e.target.files[0];
            if (selectedFile && selectedFile.type === 'image/png') {

                const formData = new FormData();
                formData.append('image', selectedFile);
                const response = await uploadProfile(formData, authToken)
                if (response.success) {
                    setLoader(false)
                    setProfile(response.url)
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

    const handleUpdateProfile = async () => {
        try {
            setLoader(true)
            const obj = {
                name,
                profile
            }
            const response = await updateProfile(authToken, obj)
            if (response.success) {
                const updatedData = response.updatedData
                dispatch(setUserData(updatedData))
                setLoader(false)
                Swal.fire({
                    title: "Congratulation!",
                    text: "Your profile has been updated successfully!",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: '#124694',
                    confirmButtonText: 'Done',
                    buttonsStyling: true,
                })
            } else {
                setLoader(false)
                notify(response.message)
            }
        } catch (error) {
            setLoader(false)
            notify(error.message)
        }
    }

    const handleChangePassword = async () => {
        if (newPass === confirmNewPass) {
            try {
                setLoader(true)
                const obj = {
                    password: newPass,
                    oldPassword: oldPass
                }
                const response = await changePassword(authToken, obj)
                if (response.success) {
                    setLoader(false)
                    setOldPass('')
                    setNewPass('')
                    setConfirmNewPass('')
                    Swal.fire({
                        title: "Congratulation!",
                        text: "Your password has been updated successfully!",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonColor: '#124694',
                        confirmButtonText: 'Done',
                        buttonsStyling: true,
                    })
                } else {
                    setLoader(false)
                    notify(response.message)
                }
            } catch (error) {
                setLoader(false)
                notify(error.message)
            }
        } else {
            notify('Password not match.')
        }

    }
    return (
        <div className='w-full bg-gray flex flex-col relative'>
            <div
                className='flex flex-row w-full'
            >

                <div
                    className='flex flex-row px-5 py-4 text-black text-lg font-bold w-1/2'
                >
                    Update Profile
                </div>

                <div
                    className='flex flex-row px-5 py-4 text-black text-lg font-bold'
                >
                    Change Password
                </div>

            </div>

            {
                loader ?
                    <div className='w-full absolute top-[40vh]  flex items-center justify-center mb-28'>
                        <FadeLoader size={100} color='#124694' />
                    </div>
                    :
                    <div
                        className='flex flex-row gap-5 px-5'
                    >
                        <div className=' w-50p bg-white mx-auto shadow-lg rounded-md flex flex-col items-end gap-10 p-6'>
                            <div className='w-full flex flex-col gap-5'>
                                <div
                                    className='w-full'
                                >
                                    <div className='flex flex-col '>
                                        <div className='text-md font-bold'>
                                            Profile Image
                                        </div>
                                        <label htmlFor='fileInput'
                                            className='active:opacity-50 mt-2 text-md font-bold cursor-pointer w-full h-[150px] flex items-center justify-center border-2 border-dashed border-gray rounded-md'>
                                            <img src={profile} className=''
                                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                                            />
                                        </label>
                                        <input
                                            id='fileInput'
                                            type='file'
                                            placeholder='Enter Brand Name'
                                            className=' w-full focus:outline-none p-1 border-2 border-gray rounded-md pl-2 mt-2 hidden'
                                            onChange={handleUploadProfile}
                                            accept='.png'
                                        />
                                    </div>
                                </div>
                                <div
                                    className='w-full flex flex-col items-start justify-between'
                                >
                                    <div className='flex flex-col w-full'>
                                        <div className='text-md font-bold ml-1'>
                                            Email
                                        </div>
                                        <div
                                            className='w-full focus:outline-none p-3 bg-disable2 rounded-md  mt-2'
                                        >
                                            {userData?.email}
                                        </div>
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <div className='text-md font-bold ml-1'>
                                            Name
                                        </div>
                                        <input
                                            className='border-2 border-gray w-full focus:outline-none p-2 rounded-md  mt-2'
                                            placeholder='Name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        {/* {userData?.email} */}

                                    </div>
                                </div>
                            </div>
                            <div
                                className='bg-blue text-white text-lg font-semibold px-7 py-3 rounded-md cursor-pointer active:opacity-50'
                                onClick={handleUpdateProfile}
                            >
                                Update
                            </div>
                        </div>

                        <div className='flex flex-col items-end w-50p bg-white mx-auto shadow-lg rounded-md flex flex-row gap-10 p-6 h-full'>
                            <div
                                className=' w-full grid grid-cols-1 gap-2'
                            >
                                <div>
                                    <div
                                        className='text-md font-bold'
                                    >
                                        Old Password
                                    </div>
                                    <div className='relative flex '>
                                        <input type={oldPassEye ? "text" : "password"} placeholder='Old Password'
                                            className='w-full mt-2 pl-2 focus:outline-none p-1 border-2 border-gray rounded-md'
                                            onChange={(e) => setOldPass(e.target.value)}
                                            value={oldPass}
                                        />
                                        <img src={
                                            oldPassEye ? images.eyeHide :
                                                images.eyeShow} className='w-4 h-3 absolute right-3 bottom-3 cursor-pointer opacity-50'
                                            onClick={() => setOldPassEye(!oldPassEye)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div
                                        className='text-md font-bold'
                                    >
                                        New Password
                                    </div>
                                    <div className='relative flex '>
                                        <input type={newPassEye ? "text" : "password"} placeholder='New Password'
                                            className='w-full mt-2 pl-2 focus:outline-none p-1 border-2 border-gray rounded-md'
                                            onChange={(e) => setNewPass(e.target.value)}
                                            value={newPass}
                                        />
                                        <img src={
                                            newPassEye ? images.eyeHide :
                                                images.eyeShow} className='w-4 h-3 absolute right-3 bottom-3 cursor-pointer opacity-50'
                                            onClick={() => setNewPassEye(!newPassEye)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div
                                        className='text-md font-bold'
                                    >
                                        Confirm Password
                                    </div>
                                    <div className='relative flex '>
                                        <input type={confirmNewPassEye ? "text" : "password"} placeholder='Confirm Password'
                                            className='w-full mt-2 pl-2 focus:outline-none p-1 border-2 border-gray rounded-md'
                                            onChange={(e) => setConfirmNewPass(e.target.value)}
                                            value={confirmNewPass}
                                        />
                                        <img src={
                                            confirmNewPassEye ? images.eyeHide :
                                                images.eyeShow} className='w-4 h-3 absolute right-3 bottom-3 cursor-pointer opacity-50'
                                            onClick={() => setConfirmNewPassEye(!confirmNewPassEye)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                className='bg-blue text-white text-lg font-semibold px-7 py-3 rounded-md cursor-pointer active:opacity-50'
                                onClick={handleChangePassword}
                            >
                                Update
                            </div>
                        </div>
                    </div>

            }

            <ToastContainer />
        </div>
    )
}
