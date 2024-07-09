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
    <div className='text-richblack-5'>
        <form onSubmit={submithandler}>
            <label>
                <p>Email address<sup>*</sup></p>
                <input 
                className='text-richblack-900'
                required
                type="email"
                name='email'
                value={email}
                onChange={onchangehandler}
                placeholder='Enter Email Address'
                 />
            </label>
            <label>
                <p>Password<sup>*</sup></p>
                <input
                className='text-richblack-900' 
                required
                type={showPssword?"text":"password"}
                name='password'
                value={password}
                onChange={onchangehandler}
                placeholder='Enter Password'
                
                 />
                 <span onClick={()=>setShowpassword(prev=>!prev)}>
                    {
                        showPssword ? (<FaRegEye />) : (<FaRegEyeSlash />)
                    }
                 </span>
            </label>
            <Link to="/forgot-password">
                <p>Forgot Password</p>
            </Link>

            <button type='submit' > 
            Sign in
             </button>
        </form>
        
    </div>
  )
}

export default LoginForm