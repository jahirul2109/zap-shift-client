import React, { useState } from 'react'
import { Link } from 'react-router'
import { FaArrowCircleRight, FaBarcode, FaBars } from 'react-icons/fa'
import Logo from '../components/Logo'
import { IoClose } from 'react-icons/io5'
import { MdOutlineClose } from 'react-icons/md'
import { VscCloseCompact } from 'react-icons/vsc'

const Navbar = () => {
    const [menu, setMenu] = useState(false)
    const links = <>
        <Link to=""
            className=''
            onClick={() => setMenu(false)} >Service</Link>
        <Link
            to='/about'
            className=''
            onClick={() => setMenu(false)} >About</Link>
        <Link
            className=''
            onClick={() => setMenu(false)} to="/coverage">Coverage</Link>
        <Link
            className=''
            onClick={() => setMenu(false)} >Be a Rider</Link>
    </>
    return (
        <nav className='  bg-white/30 backdrop-blur-lg py-4 px-6 rounded-2xl sticky top-0 z-30 w-full '>
            <div className='flex justify-between items-center'>
                {/* Righ site logo and name  */}
                <Logo></Logo>
                {/* Menu */}
                <div className='hidden items-center md:flex text-dark gap-4 font-semibold'>
                    {links}
                </div>
                {/* Left site signup / login btn */}
                <div className='md:flex hidden gap-2 '>
                    <Link to='/register' className="btn text-xl">Signup</Link>
                    <Link to='/rider_login' className="btn bg-primary text-xl">Be a Rider <FaArrowCircleRight className='-rotate-45' /></Link>
                </div>
                <div
                    onClick={() => setMenu(pre => !pre)}
                    className='flex items-center w-6 h-6 cursor-pointer md:hidden'
                >
                    <VscCloseCompact className={`absolute transition-all duration-300 ${menu ? 'opacity-100 rotate-90' : 'opacity-0 rotate-0'}`}></VscCloseCompact >
                    <FaBars className={`absolute transition-all duration-300 ${menu ? 'opacity-0 ' : 'opacity-100 rotate-0'}`}>

                    </FaBars>

                </div>
            </div>
            <div className={`
                md:hidden
                overflow-hidden transition-all duration-300 ease-in-out ${menu ? "opacity-100 max-h-60 my-4" : "opacity-0 max-h-0"}
                `}>
                <div className='flex flex-col gap-3'>
                    {
                        links
                    }
                    <div className='flex justify-between gap-3 items-center'>
                        <Link to='/register' className="btn flex-1 text-xl">Signup</Link>
                        <Link to='/rider_login' className="btn flex-1 bg-primary text-xl">Be a Rider <FaArrowCircleRight className='-rotate-45' /></Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar