import React from 'react'
import ReviewSlider from '../core/Homepage/ReviewSlider'

const ReviewSection = () => {
  return (
    <div className='flex flex-col gap-5 p-10 mt-5 overflow-hidden'>
                    <h2 className='text-center text-4xl font-semibold  text-richblack-5'>
                        Reviews from other learners
                    </h2>
                    <ReviewSlider/>
    </div>
)
}

export default ReviewSection