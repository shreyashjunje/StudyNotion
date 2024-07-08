import React from 'react'

const ReviewBox = ({review}) => {
  return (
    <div className='w-[280px] h-[250px] flex flex-col  gap-2 p-6 bg-richblack-800' >
        <div className='flex flex-row gap-4'>
            
                <img className='h-[50px] w-[50px] rounded-full' src={review.photo} alt="this is user profile photo "  />
            
            
            <div className='flex flex-col '>
                <h2 className='text-richblack-5 font-semibold'>{review.name}</h2>
                <p className='text-richblack-500 text-sm'>{review.email}</p>
            </div>
        </div>

        <p className='text-sm text-richblack-200 my-4'>{review.review}</p>

        <p className='text-yellow-100'>{review.rating}</p>
    </div>
  )
}

export default ReviewBox