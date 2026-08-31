import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router'
import { FaArrowCircleRight, FaBarcode, FaBars } from 'react-icons/fa'
import Logo from '../components/Logo'
import { VscCloseCompact } from 'react-icons/vsc'
import useAuth from '../hook/useAuth'
import './navbar.css'
const Navbar = () => {
    const { user, logout } = useAuth();
    const logutModal = useRef(null)
    const handelLogout = () => {
        logout()
            .then(() => {
                console.log("user logout Successfully")
                logutModal.current.close()
            })
    }
    const [menu, setMenu] = useState(false)
    const links = <>
        <NavLink to=""
            className=''
            onClick={() => setMenu(false)} >Service</NavLink>
        <NavLink
            to='/about'
            className=''
            onClick={() => setMenu(false)} >About</NavLink>
        <NavLink
            className=''
            onClick={() => setMenu(false)} to="/coverage">Coverage</NavLink>
        {/* {
            user && <NavLink
                to='/riders'
                className=''
                onClick={() => setMenu(false)} >Be a Rider</NavLink>
        } */}
        <NavLink
            to='/send-parcel'
            className=''
            onClick={() => setMenu(false)} >Send Parcel</NavLink>
        {
            user && <>
                <NavLink
                    to='/dashboard'
                    className=''
                    onClick={() => setMenu(false)} >Dashboard</NavLink>
            </>
        }

    </>

    return (
        <nav className='  bg-white/50 backdrop-blur-lg py-4 px-6 md:rounded-2xl sticky top-0 z-30 w-full '>
            <div className='flex justify-between items-center'>
                {/* Righ site logo and name  */}
                <Logo></Logo>
                {/* Menu */}
                <div className='hidden items-center md:flex text-dark gap-4 font-semibold'>
                    {links}
                </div>
                {/* Left site signup / login btn */}
                <div className='md:flex hidden gap-2 '>
                    {
                        user ? <> <a
                            onClick={() => logutModal.current.showModal()}
                            className="btn flex-1 text-xl">Logout</a>

                            <NavLink to='/riders' className="btn bg-primary text-xl">Be a Rider <FaArrowCircleRight className='-rotate-45' /></NavLink>
                        </> :
                            <NavLink to='/register' className="btn flex-1 text-xl">Signup</NavLink>
                    }
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

            {/* navbar For mobile device */}
            <div className={`
                md:hidden
                overflow-hidden transition-all duration-300 ease-in-out ${menu ? "opacity-100 max-h-80 my-4" : "opacity-0 max-h-0"}
                `}>
                <div className='flex flex-col gap-3'>
                    {
                        links
                    }
                    <div className='flex justify-between gap-3 items-center'>
                        {
                            user ? <><a
                                onClick={() => logutModal.current.showModal()}
                                className="btn flex-1 text-xl">Logout</a>
                                <NavLink to='/rider_login' className="btn flex-1 bg-primary text-xl">Be a Rider <FaArrowCircleRight className='-rotate-45' /></NavLink>

                            </> :
                                <NavLink to='/register' className="btn flex-1 text-xl">Signup</NavLink>
                        }
                    </div>
                </div>
            </div>
            <dialog id="my_modal_3" ref={logutModal} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-center text-lg">Are you sure Logout!</h3>
                    <div className='flex justify-between gap-3 items-center mt-10'>
                        <button onClick={handelLogout} className='rounded-md cursor-pointer px-3 md:px-5 py-1 md:py-2 bg-primary text-secondary'>Yes</button>
                        <button onClick={() => logutModal.current.close()} className='rounded-md cursor-pointer px-3 md:px-5 py-1 md:py-2 bg-amber-500 text-secondary'>No</button>
                    </div>
                </div>
            </dialog>
        </nav>
    )
}

export default Navbar