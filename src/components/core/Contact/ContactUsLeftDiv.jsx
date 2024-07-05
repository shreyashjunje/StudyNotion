import React from 'react'
import { IoIosChatboxes } from "react-icons/io";
import { IoEarth } from "react-icons/io5";
import { IoCall } from "react-icons/io5";

const ContactUsLeftDiv = () => {
    const contactusarray=[
        {
          logo:<IoIosChatboxes />,
          title:"Chat on us",
          para1:"Our friendly team is here to help.",
          para2:"@mail address"
            
        },
        {
          logo:<IoEarth />,
          title:"Visit us",
          para1:"Come and say hello at our office HQ.",
          para2:"Here is the location/ address"
            
        },
        {
          logo:<IoCall />,
          title:"Call us",
          para1:"Mon - Fri From 8am to 5pm",
          para2:"+123 456 7890"
            
        },

    ]
  return (
    <div className='text-richblack-5 bg-richblack-800 gap-6 p-6 flex flex-col rounded-lg'>
        {
          contactusarray.map((element,index)=>{
            return(
              <div key={index} className='flex gap-3 p-3 '>
                {element.logo}
                <div className='gap-2 '>
                  <h2 className='text-sm font-semibold'>{element.title}</h2>
                  <p className='text-sm  text-richblack-500'>{element.para1}</p>
                  <p className='text-sm  text-richblack-500'>{element.para2}</p>
                </div>
              </div>
            )
          })
        }
    </div>
  )
}

export default ContactUsLeftDiv