import React, { use, useEffect } from 'react'
import topImg from '../../../assets/customer-top.png'
import ReviewSlider from './ReviewSlider';


const promised = fetch('../../../../public/reviews.json').then(res => res.json());
const Review = () => {
  return (
    <div className='my-5 md:my-10'>
      <div className='flex flex-col gap-5 items-center text-center my-5 md:my-10 md:w-8/12 mx-auto'>
        <img src={topImg} alt="" />
        <h1 className='text-2xl md:text-5xl font-extrabold text-secondary'>What our customers are sayings</h1>
        <p className='text-base-100 text-center'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
      </div>
      <div>
        <ReviewSlider promised={promised}></ReviewSlider>
      </div>
    </div>
  )
}

export default Review