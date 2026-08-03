import React from 'react'
import imgLogo from "../assets/logo.png"
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router'

const links = <>
    <Link>Serverce</Link>
    <Link>About</Link>
    <Link>Categoris</Link>
</>
const Navbar = () => {
    return (
        <div className="bg-base-100 flex justify-between items-center">
            <div className='flex items-center'>

                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button>
                <dialog id="my_modal_3"  className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">Press ESC key or click on ✕ button to close</p>
                    </div>
                </dialog>

                <FaBars className='md:hidden cursor-pointer'></FaBars>
                <div className='flex items-center'>
                    <img src={imgLogo} alt="" />
                    <h1 className='hidden md:block'>ZapShift</h1>
                </div>
            </div>
            <div className='hidden md:block'>
                {links}
            </div>
            <div className='flex'>
                <button className='btn'>Sign up</button>
                <button className='btn'>Be a Rider</button>
            </div>
        </div>
    )
}

export default Navbar