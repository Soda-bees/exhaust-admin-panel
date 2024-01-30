import React, { useState } from 'react'
import images from '../../services/images'
import { useDispatch } from 'react-redux'
import { clearAuthToken } from '../../store/authTokenSlice'

export default function Header() {
    
    const dispatch = useDispatch()

    const [dropDown, setDropDown] = useState(false)
    return (
        <div className='w-full flex items-center justify-end px-5 py-2'
            style={{ position: "sticky", top: 0, zIndex: 50 }}
        >
            <div className='relative'>
                <img src={images.signinImg} className='w-10 h-10 rounded-full cursor-pointer'
                    onClick={() => setDropDown(!dropDown)}
                />
                {
                    dropDown &&
                    <div className='bg-white absolute right-0 top-12 w-[180px] shadow-lg py-5 rounded-md '>
                        <div className='flex items-center justify-between px-3 hover:bg-gray py-2 cursor-pointer active:opacity-50'>
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
