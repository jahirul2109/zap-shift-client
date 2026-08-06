import React, { useState } from 'react'
import { Link } from 'react-router'
import { GoogleLogin } from '../../components/GoogleLogin'
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5'

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className="w-8/12 mx-auto pt-10 md:pt-10 space-y-4">
            <h1 className='text-5xl font-extrabold text-secondary text-center md:text-left'>Welcome Back</h1>
            <p className='text-center md:text-left text-secondary font-semibold'>Login With Zap Shift</p>
            <fieldset className="fieldset">
                <label className="label ">Email</label>
                <input type="email" className="input w-full font-bold" name='email' placeholder="Email" />
                <label className="label ">Password</label>
                <div className='relative flex items-center'>
                    <input type={showPassword ? "text" : "password"} className="input w-full font-bold " placeholder="Password" name='pass' />
                    <IoEyeOffSharp
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute cursor-pointer text-xl transition-all duration-200 right-2 ${showPassword ? "opacity-0" : "opacity-100"}`}
                    />
                    <IoEyeSharp
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute cursor-pointer text-xl transition-all duration-200 right-2 ${showPassword ? "opacity-100" : "opacity-0"}`}
                    />
                </div>
                <Link className='underline text-primary font-semibold'>Forget Password ?</Link>
                <button className="btn btn-primary text-xl mt-4 w-full text-secondary font-semibold ">Login</button>
                <p>Don't Have An Account ?<Link to='/register' className='underline text-primary font-semibold'>Register</Link></p>
            </fieldset>
            <GoogleLogin></GoogleLogin>
        </div>
    )
}
