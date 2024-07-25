import React from 'react'
import { Link } from 'react-router-dom'


 const Button = ({children,active,linkto}) => {
  return (
    <div className=''>
        <Link to={linkto}>
            <div className={`text-center  text-[13px] px-16 lg:px-6 py-4 lg:py-3 rounded-xl font-bold
                ${active ? "bg-yellow-50 text-black":"bg-richblack-800"}
                hover:scale-95 transition-all duration-200
                `}>
                {children}
            </div>
        </Link>
    </div>
  ) 
}

export default Button
