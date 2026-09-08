import React, { use } from 'react'
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewSlider = ({ promised }) => {
  const data = use(promised);
  // console.log(data)
  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView='auto'
      spaceBetween={10}
      autoplay={{
        delay : 2000 , 
        // disableOnInteraction : true
      }}
      coverflowEffect={{
        rotate: 30,
        stretch: 0,
        depth: 120,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={true}
      modules={[EffectCoverflow, Autoplay, Pagination]}
      className="mySwiper"
    >
      {
        data.map(review => <SwiperSlide className='!w-75'>
          <div className="card w-full max-w-sm h-[200] md:h-[350] bg-white shadow-lg rounded-3xl p-6">
            {/* Quote Icon */}
            <FaQuoteLeft className="text-4xl text-cyan-200 mb-5" />

            {/* Review */}
            <p className="text-gray-500 text-sm leading-7">
              {review.review}
            </p>

            {/* Divider */}
            <div className="border-t border-dashed border-cyan-300 my-5"></div>

            {/* User */}
            <div className="flex items-center gap-4">
              <img
                src={review.user_photoURL}
                alt={review.userName}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <h3 className="font-bold text-lg text-secondary">
                  {review.userName}
                </h3>

                <p className="text-sm text-gray-500">
                 CEO. City Group 
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>)
      }
    </Swiper>
  )
}

export default ReviewSlider