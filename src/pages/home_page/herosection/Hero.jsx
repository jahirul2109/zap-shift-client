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
import { Link } from 'react-router'

const Hero = () => {
    const allBanner = [banner1, banner2, banner3]
    return (
        <Swiper
            className='mySwiper'
            loop={true}
            autoplay={{
                delay: 2000,
                disableOnInteraction: true
            }}
            pagination={{
                clickable: true
            }}
            modules={[Pagination, Autoplay]}
        >
            {
                allBanner.map(banner => <SwiperSlide className=''>
                    <div>
                        <img src={banner} alt="" className='' />
                        <div className='flex items-center gap-3 absolute top-[72%] left-20'>
                            <Link to='/dashboard/search-trackingId'>
                                <button className=' flex items-center gap-2 py-2 px-4 bg-primary rounded-full font-semibold hover:underline cursor-pointer '>Track Your Percel <FaArrowCircleRight className=' text-xl -rotate-45' /></button>
                            </Link>
                            <Link to="/riders"><button className='flex items-center gap-2 py-2 px-4 bg-secondary text-primary rounded-full font-semibold hover:underline cursor-pointer'>Be a Rider</button></Link>
                        </div>
                    </div>
                </SwiperSlide>)
            }
        </Swiper>
    )
}

export default Hero