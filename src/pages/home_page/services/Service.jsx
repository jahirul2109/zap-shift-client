import React from 'react'
import serviceImg from '../../../assets/service.png'
import Card from './Card'
const Service = () => {
    const cardData = [
        {
            title: "Express  & Standard Delivery",
            description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."
        },
        {
            title: "Nationwide Delivery",
            description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours."
        },
        {
            title: "Fulfilment Solution",
            description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support."
        },
        {
            title: "Cash On Home Delivery",
            description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product."
        }
        ,
        {
            title: "Corporate Service / Contract In Logistics",
            description: "Customized corporate services which includes warehouse and inventory management support."
        }
        ,
        {
            title: "Parcel Return",
            description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants."
        }

    ]
    return (
        <div className='px-10 bg-secondary rounded-2xl py-10 text-white space-y-10 my-10'>
            <div className='text-center'>
                <h1 className='text-2xl  font-bold'>
                    Our Service
                </h1>
                <p>
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8'>
                {
                    cardData.map((card, index) => <Card key={index} data={card}></Card>)
                }
            </div>
        </div>
    )
}

export default Service