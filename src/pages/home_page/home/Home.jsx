import React from 'react'
import Hero from '../herosection/Hero'
import Deliverysys from '../delivery_system/Deliverysys'
import Service from '../services/Service'
import Brand from '../brands/Brand'
import Support from '../support/Support'
import Merchant from '../merchant/Merchant'
import Review from '../reviews/Review'
import { Faq } from '../faq/Faq'

export const Home = () => {
  return (
    <div className='my-10'>
      <Hero></Hero>
      <Deliverysys></Deliverysys>
      <Service></Service>
      <Brand></Brand>
      <Support></Support>
      <Merchant></Merchant>
      <Review></Review>
      <Faq></Faq>
    </div>
  )
}
