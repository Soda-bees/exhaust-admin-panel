import React, { useState } from 'react'
import images from '../../services/images'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthToken } from '../../store/authTokenSlice'
import { selectUserData } from '../../store/userSlice'
import { useNavigate } from 'react-router-dom'

export default function Header() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userData = useSelector(selectUserData)

    // console.log("userda-=-=", userData);

    const [dropDown, setDropDown] = useState(false)
    return (
        <div className='w-full flex items-center justify-between px-5 py-2 bg-white'
            style={{ position: "sticky", top: 0, zIndex: 50 }}

        >
            <div
                className='font-bold text-xl'
            >
                {userData.name.charAt(0).toUpperCase() + userData.name.slice(1)}
            </div>
            <div className='relative'>
                <img src={userData?.profile} className='w-12 h-12  rounded-full cursor-pointer object-contain'
                    onClick={() => setDropDown(!dropDown)}
                />
                {
                    dropDown &&
                    <div className='bg-white absolute right-0 top-12 w-[180px] shadow-lg py-5 rounded-md '>
                        <div 
                        onClick={() => {
                            setDropDown(!dropDown)
                            navigate('/updateProfile')
                        }}
                        className='flex items-center justify-between px-3 hover:bg-gray py-2 cursor-pointer active:opacity-50'>
                            Change password
                            <img src={images.arrowRight} className='w-2 h-3 mr-1' />
                        </div>
                        <div
                            onClick={() => {
                                dispatch(clearAuthToken())
                            }}
                            className='flex items-center justify-between px-3 mt-3 hover:bg-gray py-2 cursor-pointer active:opacity-50'>
                            Logout
                            <img src={images.logout} className='w-4 h-4' />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
