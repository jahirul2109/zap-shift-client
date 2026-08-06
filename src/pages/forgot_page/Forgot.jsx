import React from 'react'

export const Forgot = () => {
    return (
        <div className="w-8/12 mx-auto pt-10 md:pt-10 space-y-4">
            <h1 className='text-5xl font-extrabold text-secondary text-center md:text-left'>Forgot Password</h1>
            <p className='text-center md:text-left text-secondary font-semibold'>Enter your email address and we’ll send you a reset link.</p>
            <fieldset className="fieldset">
                <label className="label ">Email</label>
                <input type="email" className="input w-full font-bold" name='email' placeholder="Email" />
                <button className="btn btn-primary text-xl mt-4 w-full text-secondary font-semibold ">Send</button>
                <p>Remember your Password ?<Link to='/login' className='underline text-primary font-semibold'>Login</Link></p>
            </fieldset>
        </div>
    )
}
