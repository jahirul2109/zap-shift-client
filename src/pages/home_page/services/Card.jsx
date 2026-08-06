import React from 'react'
import img from '../../../assets/service.png'
const Card = ({data}) => {
  console.log(img)
  return (
    <div className='bg-white py-3 px-5 rounded-2xl h-75 flex flex-col justify-center gap-4 items-center '>
        <div className='p-2 rounded-full bg-primary'>
          <img src={img} alt={data.title} className='w-10 md:w-14' />
        </div>
        <h1 className='text-secondary font-bold'>{data.title}</h1>
        <p className='text-base-content text-center'>{data.description}</p>
    </div>
  )
}

export default Card