import React from 'react'
import FoundationStory from "../../../assets/Images/FoundingStory.png"

const OurFoundingStory = () => {
  return (  
    <div className='flex flex-col  lg:flex-row w-full h-full p-8 lg:p-36 gap-24 items-center justify-between mx-auto'>

        <div className='flex flex-col text-start text-richblack-600  lg:w-[50%]'>
            <h1 className='gradient-text-red text-4xl font-bold my-6'>Our Founding Story </h1>

            <div className="   lg:w-[90%]">
                 <div className='mb-2'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</div>
                 <div>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</div>
            </div>

        </div>

        <div className='flex items-center lg:w-[40%] gap-2'>
            <img src={FoundationStory} alt="this is image of FoundationStory" className='bg-gradient-bg gap-2 w-[25rem] h-[16rem] lg:h-[278px] lg:w-[470px] object-cover'/>
        </div>
    </div>
  )
}

export default OurFoundingStory