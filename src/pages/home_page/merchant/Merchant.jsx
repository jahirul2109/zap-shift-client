import React from 'react'
import merchantBg from '../../../assets/be-a-merchant-bg.png'
import location from '../../../assets/location-merchant.png'
const Merchant = () => {
  return (
    <div className='relative bg-secondary rounded-2xl md:px-15 md:py-15 py-7 my-10 overflow-hidden px-8'>
        <div className='relative z-10 w-full md:w-8/12 space-y-8'>
      <h1 className='text-5xl text-white font-extrabold'>Merchant and Customer Satisfaction is Our First Priority</h1>
      <p className='text-base-100'>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
      <div className='space-x-3 flex items-center'>
        <button className=" py-2 px-4 bg-primary text-secondary rounded-full ">
          Become a Merchant 
          </button>
          <button className=" py-2 px-4 border border-green-700 rounded-full text-primary">
            Earn with ZapShift Courier
          </button>
      </div>
        </div>
        <img src={merchantBg} className='absolute inset-0 w-full top-0' alt="" />
        <img src={location} alt="" className='absolute w-fit right-4 bottom-10' />
    </div>
  )
}

export default Merchant