import React from 'react'
import vanImg from '../../../assets/delivery-van.png'
const Deliverysys = () => {
    const cardData = [
        {
            image: vanImg,
            title: "Booking Pick & Drop",
            description: "From personal packages to business shipments — we deliver on time, every time."
        },
        {
            image: vanImg,
            title: "Cash On Delivery",
            description: "From personal packages to business shipments — we deliver on time, every time."
        },
        {
            image: vanImg,
            title: "Delivery Hub",
            description: "From personal packages to business shipments — we deliver on time, every time."
        },
        {
            image: vanImg,
            title: "Booking SME & Corporate",
            description: "From personal packages to business shipments — we deliver on time, every time."
        }

    ]
    return (
        <div className='md:px-10 px-4 mx-auto w-full my-5 md:my-10'>
            <h1 className='font-bold text-2xl text-secondary'>How it Work</h1>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 '>
                {
                    cardData.map((card, index) => <div key={index} className='space-y-3 flex flex-col justify-center md:items-center bg-white h-[15rem] py-2 px-3 rounded-2xl' >
                        <img src={card.image} className='w-10 md:w-14' alt="" />
                        <h1 className='text-secondary font-bold text-xl'>{card.title}</h1>
                        <p className='text-dark'>{card.description}</p>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Deliverysys