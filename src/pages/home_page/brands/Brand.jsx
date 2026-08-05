import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

import amazon from "../../../assets/brands/amazon.png"
import amazon_vector from "../../../assets/brands/amazon_vector.png"
import casio from "../../../assets/brands/casio.png"
import moonstar from "../../../assets/brands/moonstar.png"
import star from "../../../assets/brands/star.png"
import star_people from '../../../assets/brands/startpeople.png'
import { Autoplay } from 'swiper/modules'

const Brand = () => {
  const allImage = [amazon, amazon_vector, casio, moonstar, star, star_people];
  return (
    <div className='my-14'>
      <h1 className='text-secondary text-2xl font-bold text-center my-10'>We've helped thousands of sales teams</h1>
      <Swiper
        slidesPerView={4}
        spaceBetween={40}
        loop={true}
        speed={2000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false
        }}
        modules={[Autoplay]}
        className='mySwiper'
      >
        <div className='flex items-center justify-between'>
          {
            allImage.map((brand) => <SwiperSlide>
              <img src={brand} alt="" />
            </SwiperSlide>
            )
          }
        </div>
      </Swiper>
    </div>
  )
}

export default Brand