import React, { useState } from 'react'
import { Link } from 'react-router'
import { FaArrowCircleRight, FaBarcode, FaBars } from 'react-icons/fa'
import Logo from '../components/Logo'
import { IoClose } from 'react-icons/io5'
import { MdOutlineClose } from 'react-icons/md'
import { VscCloseCompact } from 'react-icons/vsc'
const links = <>
    <h1><Link>Service</Link></h1>
    <h1 className='py-2 px-3 rounded-3xl bg-amber-300'><Link>Service</Link></h1>
    <h1><Link to="/coverage">Coverage</Link></h1>
    <h1><Link>Be a Rider</Link></h1>
</>
const Navbar = () => {
    const [menu, setMenu] = useState(false)
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
                    <button className="btn text-xl">Signup</button>
                    <button className="btn bg-primary text-xl">Be a Rider <FaArrowCircleRight className='-rotate-45' /></button>
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
                        <button className="btn text-xl flex-1">Signup</button>
                        <button className="btn bg-primary flex-1 text-xl">Be a Rider <FaArrowCircleRight className='-rotate-45' /></button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar