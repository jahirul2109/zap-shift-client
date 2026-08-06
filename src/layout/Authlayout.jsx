import React from 'react'
import Logo from '../components/Logo'
import { Outlet } from 'react-router'
import authImg from '../../src/assets/authImage.png'
const Authlayout = () => {
    return (
        <div className='flex justify-between md:flex-row flex-col-reverse min-h-screen '>
            <div className='bg-white md:py:10 md:px-10 py-8 px-3 flex-1 flex flex-col   '>
                <div className='md:block hidden'><Logo></Logo></div>
                <Outlet></Outlet>
            </div>
            <div className='flex-1 flex flex-col md:items-center'>
               <div className='block md:hidden py-5 px-5'><Logo></Logo></div>
                <img src={authImg} alt="" />
            </div>
        </div>
    )
}

export default Authlayout