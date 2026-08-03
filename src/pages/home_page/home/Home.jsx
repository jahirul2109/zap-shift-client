import React from 'react'
import Hero from '../herosection/Hero'
import Deliverysys from '../delivery_system/Deliverysys'
import Service from '../services/Service'

export const Home = () => {
  return (
    <div className='my-10'>
      <Hero></Hero>
      <Deliverysys></Deliverysys>
      <Service></Service>
    </div>
  )
}
