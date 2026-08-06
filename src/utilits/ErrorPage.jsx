import React from 'react'
import { Link } from 'react-router'
import Logo from '../components/Logo'
import errorImg from '../assets/error.svg'

const ErrorPage = () => {
    return (
        <div className=' my-5 w-11/12 mx-auto space-y-4'>
            <div>
                <Logo></Logo>
            </div>
            <div className=' flex flex-col p-5 items-center bg-white rounded-2xl'>
                <img src={errorImg} className='h-[70vh]' alt="" />
                <Link to='/' className='btn btn-primary text-secondary rounded-2xl'>Home</Link>
            </div>
        </div>
    )
}

export default ErrorPage