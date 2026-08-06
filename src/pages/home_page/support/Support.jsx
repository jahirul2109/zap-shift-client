import React from 'react'

import checking from '../../../assets/brands/checking.svg'
import box from '../../../assets/brands/box.svg'
import call from '../../../assets/brands/call.svg'
const Support = () => {
    return (
        <div className='space-y-6 my-10'>
            {/* card */}
            <div className='flex flex-col md:flex-row gap-10 items-center py-10 px-8 bg-white rounded-2xl'>
                <div className=' md:flex-1 md:border-r-2 px-4 border-dotted border-gray-500'>
                    <img src={checking} className='w-full' alt="" />
                </div>
                <div className='space-y-7 md:flex-3'>
                    <h1 className='text-xl font-bold text-secondary'>
                        Live Percel Traking
                    </h1>
                    <p className='text-base-content'>Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.</p>
                </div>
            </div>
            {/* card */}
            <div className='flex flex-col md:flex-row gap-10  items-center py-10 px-8 bg-white rounded-2xl'>
                <div className='md:flex-1 md:border-r-2 px-4 border-dotted border-gray-500'>
                    <img src={box} className='w-full' alt="" />
                </div>
                <div className='space-y-7 md:flex-3'>
                    <h1 className='text-xl font-bold text-secondary'>
                        100% Safe Delivery
                    </h1>
                    <p className='text-base-content'>We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.</p>
                </div>
            </div>
            {/* card */}
            <div className='flex flex-col md:flex-row gap-10  items-center py-10 px-8 bg-white rounded-2xl'>
                <div className='md:flex-1 md:border-r-2 px-4 border-dotted border-gray-500'>
                    <img src={call} className='w-10/12' alt="" />
                </div>
                <div className='space-y-7 md:flex-3'>
                    <h1 className='text-xl font-bold text-secondary'>
                        24/7 Call Center Support
                    </h1>
                    <p className='text-base-content'>Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.</p>
                </div>
            </div>
        </div>
    )
}

export default Support