import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPasswordResetToken } from '../services/operations/authAPI';

const ForgotPasswod = () => {
    const[email,setEmail]=useState("")
    const [emailSent,setEmailSent]=useState(false);
    const{loading}=useSelector((state)=>state.auth)
    const dispatch=useDispatch();

    function handleonSubmit(event){
        event.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent))
    }
    
  return (
    <div className='text-richblack-25'>
       {
        loading? (
        <div>loading...</div>
        ) : (
            <div>
                <h2>
                    {
                        !emailSent ? "Reset your password" :"Check email"
                    }
                </h2>

                <p>
                    {
                        !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                        :
                        `We have sent the reset email to ${email}`
                    }
                </p>

                <form onSubmit={handleonSubmit}>
                   <div>
                        {
                            !emailSent &&(
                                <label>
                                    <p>Email Address*</p>
                                    <input 
                                    className='text-richblack-900'
                                    required
                                    type="email"
                                    value={email}
                                    onSubmit={(event)=>setEmail(event.target.value)}
                                    name='email'
                                     />
                                     
                                </label>
                            )
                            
                        }
                   </div>
                </form>

                <button type='submit'>
                    {
                        !emailSent?"Reset Password" : "Resend Email"
                    }
                </button>

                <Link to="/login" >
                    <div>
                        Back to login
                    </div>
                </Link>
            </div>
        )
       }
    </div>
  )
}

export default ForgotPasswod