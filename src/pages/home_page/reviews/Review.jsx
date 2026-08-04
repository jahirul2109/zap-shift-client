import React from 'react'
import topImg from '../../../assets/customer-top.png'
const Review = () => {
  return (
    <div>
        <div className='flex flex-col gap-5 items-center text-center my-5 md:my-10 md:w-8/12 mx-auto'>
            <img src={topImg} alt="" />
            <h1 className='text-2xl md:text-5xl font-extrabold text-secondary'>What our customers are sayings</h1>
            <p className='text-base-100 text-center'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
        </div>
    </div>
  )
}

export default Review