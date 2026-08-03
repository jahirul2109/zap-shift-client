import React from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
// import 'swiper/css';
import 'swiper/css/pagination';
// import './styles.css';
import banner1 from "../../../assets/banner/banner1.png"
import banner2 from "../../../assets/banner/banner2.png"
import banner3 from "../../../assets/banner/banner3.png"
import { FaArrowCircleRight } from 'react-icons/fa'

const Hero = () => {
    const allBanner = [banner1, banner2, banner3]
    return (
        <Swiper
            className='mySwiper'
            autoplay={{
                delay : 2000,
                disableOnInteraction : true
            }}
            pagination={{
                clickable : true
            }}
            modules={[Pagination, Autoplay]}
        >
            {
                allBanner.map(banner => <SwiperSlide className=''>
                    <div>
                        <img src={banner} alt="" className='' />
                        <div className='flex items-center gap-3 absolute top-[72%] left-20'>
                            <button className=' flex items-center gap-2 py-2 px-4 bg-primary rounded-full font-semibold hover:underline cursor-pointer '>Track Your Percel <FaArrowCircleRight className=' text-xl -rotate-45' /></button>
                            <button className='btn'>Be a Rider</button>
                        </div>
                    </div>
                </SwiperSlide>)
            }
        </Swiper>
    )
}

export default Hero