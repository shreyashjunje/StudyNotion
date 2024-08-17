import React from 'react'
import Course_Card from './Course_Card'
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from "swiper/modules"

const CourseSlider = ({ Courses }) => {
  return (
    <div>
      {
        Courses?.length ? (
          <Swiper 
            slidesPerView={1} 
            loop={true} 
            spaceBetween={200} 
            pagination={{ dynamicBullets: true }} 
            modules={[FreeMode, Pagination]} 
            breakpoints={{1024:{slidesPerView:3,}}}
            className='mySwiper'>
              {
                Courses?.map((course, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Course_Card course={course} height={"h-[250px]"} />
                    </SwiperSlide>
                  )
                })
              }
          </Swiper>
        ) : (
          <p>No course found</p>
        )
      }
    </div>
  )
}

export default CourseSlider
