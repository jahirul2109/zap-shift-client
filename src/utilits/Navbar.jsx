import React from 'react'
import logo from "./../assets/logo.png"
import { Link } from 'react-router'
import { FaArrowCircleRight } from 'react-icons/fa'
const links = <>
    <h1><Link>Service</Link></h1>
    <h1 className='py-2 px-3 rounded-3xl bg-amber-300'><Link>Service</Link></h1>
    <h1><Link>Service</Link></h1>
    <h1><Link>Be a Rider</Link></h1>
</>
const Navbar = () => {
  return (
    <div className='flex justify-between items-center bg-white py-4 px-6 rounded-2xl '>
        {/* Righ site logo and name  */}
        <div className='flex items-end gap-2'>
        <img src={logo} alt="" />
        <h1 className='-ms-4 font-bold text-2xl'>Zapshit</h1>
        </div>
        {/* Menu */}
        <div className='flex items-center text-dark gap-4 font-semibold'>
            {links}
        </div>
        {/* Left site signup / login btn */}
        <div className='flex gap-2 '>
            <button className="btn text-xl">Signup</button>
            <button className="btn bg-primary text-xl">Be a Rider <FaArrowCircleRight className='-rotate-45' /></button>
        </div>
    </div>
  )
}

export default Navbar