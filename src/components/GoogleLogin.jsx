import React, { useState } from 'react'
import useAuth from '../hook/useAuth'
import { GoogleAuthProvider } from 'firebase/auth'
import { useNavigate } from 'react-router'
import { useAxiousSecoure } from '../hook/useAxiousSecoure'
import Swal from 'sweetalert2'

export const GoogleLogin = ({ state }) => {
    const axiousInstence = useAxiousSecoure();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const from = state ? state : "/";
    // console.log(state)
    const { socialLogin } = useAuth()
    const googleProvider = new GoogleAuthProvider();
    const handelLogin = async () => {
        setLoading(true)
        try {
            const res = await socialLogin(googleProvider);

            const user = res.user;

            const token = await user.getIdToken();

            const userInfo = {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            };
            const result = await axiousInstence.post("/users", userInfo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (result.data.insertedId) {
                Swal.fire({
                    title: "Created Account Successfully!",
                    icon: "success",
                    draggable: true
                });
            } else {
                Swal.fire({
                    title: "Login Successfully!",
                    icon: "success",
                    draggable: true
                });
            }

            navigate(from);
        }
        catch (err) {
            Swal.fire({
                title: "Error!",
                icon: "error",
                draggable: false,
                footer: err.message
            });
            // console.log(err.message)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className='text-center space-y-4'>
            <h1 className='text-xl font-bold text-secondary'>Or</h1>
            <button
                disabled={loading}
                onClick={handelLogin} className={`btn  bg-white w-full text-black border-[#e5e5e5] `}>
                {loading ?
                    <> <span className="loading loading-spinner loading-sm"></span> Logging in... </>
                    :
                    <>
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </>
                }
            </button>
        </div>
    )
}
