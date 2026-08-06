import React, { useState } from 'react'
import { GoogleLogin } from '../../components/GoogleLogin'
import { Link } from 'react-router'
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5'
import useAuth from '../../hook/useAuth'
import { useForm } from 'react-hook-form'
import auth from '../../firebase/firebase.config'
import axios from 'axios'

export const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { createUser, profileUpdate } = useAuth()

    // use react-hook-form
    const { register, handleSubmit, reset } = useForm()

    const userSubmitedInfo = async (data) => {
        const profileImg = data.photo[0];

        await createUser(data.email, data.pass)
            .then(async (res) => {

                // coverted formaData 
                const formData = new FormData()
                formData.append("image", profileImg);
                const imageBB_Api_Url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_KEY}`

                // store photo
                await axios.post(imageBB_Api_Url, formData)
                    .then(res => {
                        console.log("img url", res.data.data.url)
                        const profile = {
                            displayName: data.name,
                            photoURL: res.data.data.display_url
                        }

                        // update profile
                        profileUpdate(profile)
                            .then(() => {
                                console.log("updeted profile")
                            })
                            .catch(err => {
                                console.log(err.message)
                            })
                    })
                // console.log(res)
                reset();
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    // create user without hook-form
    // const handelRegiseter = (e) => {
    //     e.preventDefault();
    //     const email = e.target.email.value;
    //     const name = e.target.name.value;
    //     const pass = e.target.pass.value;

    //     createUser(email , pass)
    //     .then (res => {
    //         console.log(res.user)
    //     })
    //     .catch(err=> console.log(err.message))

    // }
    return (
        <div className="w-8/12 mx-auto pt-10 md:pt-10 space-y-4">
            <h1 className='text-5xl font-extrabold text-secondary text-center md:text-left'>Create An Account</h1>
            <p className='text-center md:text-left text-secondary font-semibold'>Register With Zap Shift</p>
            <form onSubmit={handleSubmit(userSubmitedInfo)} className="fieldset">
                <label htmlFor="avatar" className="cursor-pointer">
                    <img
                        src="https://i.ibb.co/4pDNDk1/avatar.png"
                        className="w-12 h-12 rounded-full border object-cover"
                        alt="avatar"
                    />
                    Select Photo
                </label>

                <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    // onChange={(e)=> {
                    //     console.log(e.target.files)
                    //     console.log(e.target.files[0])
                    // }}
                    {...register("photo")}
                    className="hidden"
                />
                {/* For user name */}
                <label className="label ">Name</label>
                <input
                    {...register("name")}
                    type="text"
                    className="input w-full font-bold"
                    name='name'
                    placeholder="Enrer Name"
                />
                {/* Email field */}
                <label className="label ">Email</label>
                <input
                    {...register("email")}
                    type="email"
                    className="input w-full font-bold"
                    name='email'
                    placeholder="Email"
                />
                {/* Password Field */}
                <label className="label ">Password</label>
                <div className='relative flex items-center'>
                    <input
                        {...register("pass")}
                        type={showPassword ? "text" : "password"}
                        className="input w-full font-bold "
                        placeholder="Password"
                        name='pass'
                    />
                    <IoEyeOffSharp
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute cursor-pointer text-xl transition-all duration-200 right-2 ${showPassword ? "opacity-0" : "opacity-100"}`}
                    />
                    <IoEyeSharp
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute cursor-pointer text-xl transition-all duration-200 right-2 ${showPassword ? "opacity-100" : "opacity-0"}`}
                    />
                </div>
                <button
                    type='submit'
                    className="btn btn-primary text-xl mt-4 w-full text-secondary font-semibold"
                >Register</button>
                <p>Already Have An Account ? <Link to='/login' className='underline text-primary font-semibold'> Login</Link></p>
            </form>
            <GoogleLogin></GoogleLogin>
        </div>
    )

}