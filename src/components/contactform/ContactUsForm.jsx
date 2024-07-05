import React, { useState,useEffect } from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from "../../data/countrycode.json"

const ContactUsForm = () => {

    const [loading,setLoading]=useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    }=useForm();

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                firstname:"",
                lastname:"",
                email:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset,isSubmitSuccessful]);

    const submitContactForm=async(data)=>{
        console.log("logging data",data);
        try{
            setLoading(true);
            // const response=await apiConnector("POST",contactusEndpoint.CONTACT_US_API, data);
            const response={status:"ok"};
            console.log("logging response : ",response)
            setLoading(false);   

        }
        catch(error){
            console.log("error",error.message);
            setLoading(false)
        }

    }

  return (
    <div className='text-richblack-5 '>
        <form onSubmit={handleSubmit(submitContactForm)}>
            <div className='flex flex-col'>
                {/* firstname&lastname  */}
                <div className='flex my-4 gap-4'>
                    {/* firstname */}
                    <div className='flex flex-col'>
                        <label htmlFor="firstname">First name</label>
                        <input
                            className='text-richblack-500 bg-richblack-800 p-2 rounded-lg border-b-2 border-richblack-600'
                            type="text"
                            name='firstname'
                            id='firstname'
                            placeholder='Enter first name'
                            {...register("firstname",{required:true})}
                        />
                        {
                            errors.firstname&&(
                                <span>
                                    please enter your name
                                </span>
                            )
                        }
                    </div>

                    {/* lastname */}
                    <div className='flex flex-col'>
                        <label htmlFor="lastname">Last name</label>
                        <input
                            className='text-richblack-500  bg-richblack-800 p-2 rounded-lg border-b-2 border-richblack-600'
                            type="text"
                            name='lastname'
                            id='lastname'
                            placeholder='Enter last name'
                            {...register("lastname")}
                        />
                        {
                            errors.lastname&&(
                                <span>
                                    please enter your lastname
                                </span>
                            )
                        }
                    </div>
                </div>

                {/* email */}
                <div className='flex flex-col my-4'>
                    <label htmlFor="email">Email Address</label>
                    <input 
                    className='text-richblack-500  bg-richblack-800 p-2 rounded-lg border-b-2 border-richblack-600'
                    type="email"
                    id='email'
                    name="email"
                    placeholder='Enter email address'
                    {...register("email" , {required:true})}

                    />
                    {
                        errors.email && (
                            <span>
                                please enter your email address
                            </span>
                        )
                    }
                </div>

                {/* phone no */}
                <div className='w-full'>
                    <label htmlFor="phoneNo">Phone Number</label>
                    <div className='flex text-black gap-4 '>
                        {/* dropdown */}
                        {/* <div> */}
                            <select className='w-[80px]  text-richblack-500   bg-richblack-800 p-2 rounded-lg border-b-2 border-richblack-600' name="dropdown" id="dropdown" {...register("CountryCode",{requiored:true})}>
                                {
                                    CountryCode.map((element,index)=>{
                                        return(
                                            <option key={index} value="element.code">
                                                {element.code}-{element.country}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        {/* </div> */}

                        {/* phone no input */}
                        {/* <div> */}
                            <input 
                            className='[&::-webkit-inner-spin-button]:appearance-none [appearance:textfield] w-[calc(100%-90px)] text-richblack-500  bg-richblack-800
                            p-2 rounded-lg border-b-2 border-richblack-600'

                            type="number"
                            id='phonenumber'
                            name='phonenumber'
                            {...register("phoneNo",
                                {
                                
                                    required:{value:true,message:"please enter your phone number"},
                                    maxLength:{value:10,message:"Invalid Phone Number"},
                                    minLength:{value:8,message:"Invalid Phone Number"},    

                                }
                            )}
                             />
                        {/* </div> */}
                       
                    </div>
                    {
                        errors.phoneNo && (
                            <span>
                                {errors.phoneNo.message}
                            </span>
                        )
                    }
                </div>

            </div>

            {/* textarea */}
            <div className='flex flex-col my-4'>
                <label htmlFor="message">Message</label>
                <textarea 
                className='text-richblack-500  bg-richblack-800 p-2 rounded-lg border-b-2 border-richblack-600'
                name="message"
                id="message"
                placeholder='enter your message here'
                cols={38}
                rows={5}
                {...register("message",{required:true})}
                />
                {
                    errors.message&&(
                        <span>
                            Please enter your message
                        </span>
                    )
                }
            </div>

            <button type='submit' className='bg-yellow-50 text-black text-center w-full text-[13px] px-6 py-3 my-4 rounded-md font-bold
             hover:scale-95 transition-all duration-200'>
                Send Message
            </button>
        </form>
    </div>
  )
}

export default ContactUsForm