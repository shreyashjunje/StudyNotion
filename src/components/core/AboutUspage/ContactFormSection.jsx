import React from 'react'
import ContactUsForm from '../../contactform/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='flex flex-col mx-auto items-center gap-[36px] mb-10 '>
        <div className='text-richblack-5 flex items-center flex-col gap-3'>
            <h2 className='text-4xl font-semibold '>Get in Touch</h2>
            <p className='text-richblack-300'>We’d love to here for you, Please fill out this form.</p>
        </div>

        <div>
            <ContactUsForm/>
        </div>
    </div>
  )
}

export default ContactFormSection