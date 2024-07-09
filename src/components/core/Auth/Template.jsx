import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import bgframe from "../../../assets/Images/frame.png"
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const Template = ({title,description1,description2,Image,formType}) => {
    const {loading}=useSelector(state=>state.auth)



  return (
    <div>
        {
            loading ? (
                <div className='Spinner'>
                    Loading...
                </div>
            ) : (
                <div>

                    <div>
                        <h1>
                            {title}
                        </h1>
                        <p>
                            {description1}
                        </p>
                        <p>
                            {description2}
                        </p>
                        {
                            formType==="Login" ? (<LoginForm/>) : (<SignUpForm/>)
                        }
                    </div>

                    <div className='relative'>
                        <img src={bgframe} alt="this  is backgroud friend" />
                        <img src={Image} alt="" />
                    </div>

                </div>
            )

        }
    </div>
  )
}

export default Template