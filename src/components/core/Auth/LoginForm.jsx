import React from 'react'
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useState } from 'react';
import {  useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import {login} from '../../../services/operations/authAPI';

const LoginForm = () => {
    const[formData,setFormData]=useState({email:"",password:""})
    const[showPssword,setShowpassword]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {email,password}=formData;
    const onchangehandler=(e)=>{
        setFormData((prevData)=>({
            ...prevData,
            [e.target.name]:e.target.value     
     })
        )
    }
    const submithandler=(event)=>{
        event.preventDefault();
        // console.log(formData)
        dispatch(login(email,password,navigate))
    }

  return (
    <div className='text-richblack-5 flex flex-col'>
        <form onSubmit={submithandler} className='flex flex-col gap-4'>
            <label>
                <p>Email address <sup className='text-Red-400'>*</sup></p>
                <input 
                className='bg-[#161D29] text-[#999DAA] p-3 w-full rounded-lg'
                required
                type="email"
                name='email'
                value={email}
                onChange={onchangehandler}
                placeholder='Enter Email Address'
                 />
            </label>
            <label className='relative'>
                <p>Password <sup className='text-Red-400'>*</sup></p>
                <div>
                    <input
                    className='w-full bg-[#161D29] text-[#999DAA] p-3 rounded-lg' 
                    required
                    type={showPssword?"text":"password"}
                    name='password'
                    value={password}
                    onChange={onchangehandler}
                    placeholder='Enter Password'

                    
                    
                    />
                    <span className='absolute right-3 top-[42px] z-[10] cursor-pointer' onClick={()=>setShowpassword(prev=>!prev)}>
                        {
                            showPssword ? (<FaRegEye />) : (<FaRegEyeSlash />)
                        }
                    </span>
                </div>
                <Link to="/forgot-password">
                     <p className='text-sm text-[#47A5C5] text-right py-1'>Forgot Password</p>
                 </Link>
                
            </label>
           

           
            <button className='flex flex-stretch bg-[#FFD60A] text-black p-3 rounded-lg w-full justify-center'  type='submit' > 
            Sign in
             </button>
        </form>
        
    </div>
  )
}

export default LoginForm