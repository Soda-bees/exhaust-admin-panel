import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import { Outlet, useNavigate, } from 'react-router-dom'
import Sidebar from '../../component/Sidebar'
import Signin from '../Signin';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/authTokenSlice';

export default function Layout() {

    const authToken = useSelector(selectAuthToken)
    const navigate = useNavigate();

    const handleSignOut = () => {
        navigate('/signin');
    };

    useEffect(() => {
        if (!authToken) {
            navigate('/signin');
        } else {
            // navigate('/')
            navigate('/products')
        }
    }, [authToken, navigate]);

    if (!authToken) {
        return <Signin  />;
    }

    return (
        <>
            <div className='flex'>
                <Sidebar />
                <div className='w-full ml-15p min-h-screen bg-gray'>
                    <Header handleSignOut={handleSignOut} />
                    <Outlet />
                </div>
            </div>
        </>

    )
}
