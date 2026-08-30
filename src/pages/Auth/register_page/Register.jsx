import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import useAuth from '../../../hook/useAuth'
import { GoogleLogin } from '../../../components/GoogleLogin'
import { useAxiousSecoure } from '../../../hook/useAxiousSecoure'
import Swal from 'sweetalert2'

export const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { createUser, profileUpdate } = useAuth()
    const axiosIntence = useAxiousSecoure();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state || "/";
    // use react-hook-form
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const userSubmitedInfo = async (data) => {
        try {
            const profileImg = data.photo[0];
            if (!profileImg) {
                throw new Error("No profile image selected");
            }

            if (!(profileImg instanceof File)) {
                throw new Error("Selected image is not a File");
            }
            // coverted formaData 
            const formData = new FormData()
            formData.append("image", profileImg);
            const apiKey = import.meta.env.VITE_IMAGEBB_KEY;

            console.log("apiKey", apiKey)
            console.log("img", profileImg)
            console.log("imgType", profileImg.type)

            const imageBB_Api_Url = `https://api.imgbb.com/1/upload?key=${apiKey}`
            // store photo
            const imageResult = await axios.post(imageBB_Api_Url, formData);
            console.log("imgeresult", imageResult)
            const userImg = imageResult.data.data.url;

            // Create Account
            const result = await createUser(data.email, data.pass)
            const user = await result.user;

            const profile = {
                displayName: data.name,
                photoURL: userImg
            }

            // update profile
            await profileUpdate(user, profile)
            const userInfo = {
                name: data.name,
                email: data.email,
                photoURL: userImg,
            }

            // post  user data in database
            const dbResult = await axiosIntence.post('/users', userInfo);
            // console.timeEnd("db")
            Swal.fire({
                title: "Created Account Successfully !",
                icon: "success",
                draggable: true
            });
            console.log(profileImg)

            navigate(from)
            reset();

        }
        catch (error) {
            // console.log("STATUS:", error.response?.status);
            // console.log("DATA:", error.response?.data);
            // console.log("MESSAGE:", error.message);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: `${error.message}`
            });
        }




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
                        src={`https://i.ibb.co/4pDNDk1/avatar.png`}
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
                    {...register("photo", { required: "Photo is required" })}
                    className="hidden"
                />
                {errors.photo && <p className='text-red-500'>{errors.photo.message}</p>}
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
                <p>Already Have An Account ? <Link to='/login' state={location.state} className='underline text-primary font-semibold'> Login</Link></p>
            </form>
            <GoogleLogin state={location.state}></GoogleLogin>
        </div>
    )

}