import React from 'react'
import aboutus1 from "../../../assets/Images/aboutus1.webp"
import aboutus2 from "../../../assets/Images/aboutus2.webp"
import aboutus3 from "../../../assets/Images/aboutus3.webp"


const AboutUsPhotoframe = () => {
  return (
    <div className='absolute  mb-17'>
        <div className=' translate-y-[140%]  flex flex-row  gap-24 '>
            <img src={aboutus1} alt="this is first image" className=' w-full h-auto object-cover '/>
            <img src={aboutus2} alt="this is second image" className='w-full h-autoobject-cover'/>
            <img src={aboutus3} alt="this is third image" className='w-full h-auto object-cover'/>
        </div>
       
    </div>
  )
}

export default AboutUsPhotoframe;
