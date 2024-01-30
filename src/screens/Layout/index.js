import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import { Outlet, useNavigate, } from 'react-router-dom'
import Sidebar from '../../component/Sidebar'
import Signin from '../Signin';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/authTokenSlice';

export default function Layout() {

    const authToken = useSelector(selectAuthToken)
    console.log(authToken);
    // const [authToken, setIsAuth] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = () => {
        // setIsAuth(false);
        navigate('/signin');
    };

    useEffect(() => {
        if (!authToken) {
            navigate('/signin');
        } else {
            navigate('/')
        }
    }, [authToken, navigate]);

    if (!authToken) {
        return <Signin  />;
    }

    return (
        <>
            <div className='flex'>
                <Sidebar />
                <div className='w-full ml-15p h-[94vh]'>
                    <Header handleSignOut={handleSignOut} />
                    <Outlet />
                </div>
            </div>
        </>

    )
}
