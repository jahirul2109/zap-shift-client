import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import useAuth from '../../../hook/useAuth'
import { GoogleLogin } from '../../../components/GoogleLogin'
import { useAxiousSecoure } from '../../../hook/useAxiousSecoure'
import Swal from 'sweetalert2'

export const Login = () => {
    const { loginWithEmailPassword } = useAuth();
    const axiousInstence = useAxiousSecoure();
    const [showPassword, setShowPassword] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state || '/';
    console.log(location)

    const { handleSubmit, register, reset } = useForm()
    const handelLogin = (data) => {
        const { email, pass } = data;
        loginWithEmailPassword(email, pass)
            .then(result => {
                const userInfo = {
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL
                }
                axiousInstence.post("/users", userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Logged in Successfully !",
                                icon: "success",
                                draggable: true
                            });
                        }
                    })
                navigate(from)
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: `${err.message}`
                });
            })
    }
    return (
        <div className="w-8/12 mx-auto pt-10 md:pt-10 space-y-4">
            <h1 className='text-5xl font-extrabold text-secondary text-center md:text-left'>Welcome Back</h1>
            <p className='text-center md:text-left text-secondary font-semibold'>Login With Zap Shift</p>
            <form className="fieldset" onSubmit={handleSubmit(handelLogin)}>
                <label className="label ">Email</label>
                <input type="email" {...register("email")} className="input w-full font-bold" name='email' placeholder="Email" />
                <label className="label ">Password</label>
                <div className='relative flex items-center'>
                    <input type={showPassword ? "text" : "password"} {...register("pass")} className="input w-full font-bold " placeholder="Password" name='pass' />
                    <IoEyeOffSharp
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute cursor-pointer text-xl transition-all duration-200 right-2 ${showPassword ? "opacity-0" : "opacity-100"}`}
                    />
                    <IoEyeSharp
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute cursor-pointer text-xl transition-all duration-200 right-2 ${showPassword ? "opacity-100" : "opacity-0"}`}
                    />
                </div>
                <Link to='/forget_password' className='underline text-primary font-semibold'>Forget Password ?</Link>
                <button className="btn btn-primary text-xl mt-4 w-full text-secondary font-semibold ">Login</button>
                <p>Don't Have An Account ? <Link to='/register' state={location.state} className='underline text-primary font-semibold'>Register</Link></p>
            </form>
            <GoogleLogin state={location.state} ></GoogleLogin>
        </div>
    )
}
