import React from 'react'
import ContactUsForm from '../components/contactform/ContactUsForm'
import ContactUsLeftDiv from '../components/core/Contact/ContactUsLeftDiv'

const Contact = () => {
  return (
    <div className='flex flex-row justify-evenly   p-24 '>
        <div>
            <ContactUsLeftDiv/>
        </div>

        <div className='border-2 border-richblack-700 rounded-lg p-8 w-[600px] h-[700px]'>
            {/* <div className='text-richblack-5 flex  flex-col gap-3 p-4'> */}
                <h2 className='text-4xl text-richblack-5 font-semibold '>Got a Idea? We’ve got the skills. Let’s team up</h2>
                <p className='text-richblack-300 '>Tall us more about yourself and what you’re got in mind.</p>
            {/* </div> */}
            <div>
            <ContactUsForm/>

            </div>
        </div>
    </div>
  )
}

export default Contact