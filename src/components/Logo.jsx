import React from 'react'
import logoImg from '../assets/logo.png'
import { Link } from 'react-router'
const Logo = () => {
    return (
        <div className=''>
            <Link to='/' className='flex items-end gap-2'>
                <img src={logoImg} alt="" />
                <h1 className='-ms-4 font-bold text-2xl'>Zapshit</h1>
            </Link>
        </div>
    )
}

export default Logo