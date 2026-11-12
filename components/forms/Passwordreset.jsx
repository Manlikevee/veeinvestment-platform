'use client'
import React, { useState } from 'react'
import Inputcomponent from '../Inputcomponent';
import Mylogocomponent from '../Mylogocomponent';
import Link from 'next/link';
import Popup from '../utility/Popup';


const Passwordreset = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
      setIsOpen(!isOpen);
    };
  
    const handleClose = () => {
      setIsOpen(false);
      console.log('Popup closed');
    };
  return (
    <div className="miniformdiv">
      {isOpen && (
        <Popup
          title="Verification Successful"
          subtext="You have successfully verified your email address. Proceed to verify your phone number."
          close={handleClose}
        />
      )}
    <div className='mybglogoimg'>   <Mylogocomponent  /></div> 
<p className='loginhelper'>Enter the email associated with your account and we will send instructions on how to reset your password</p>


<Inputcomponent 
   inputState={email} 
   setInputState={setEmail} 
   label="Email" 
   inputType="text" 
   name="email" 
   id="email" 
icontype='email'
 />



{/* <small className='rightside' >Forgot Password?</small> */}
{isLoading ?        
<button id="loadingBtn" className='mybtn' >

<span className='loading-spinner'></span> 
</button>
   :
<button className='mybtn' onClick={togglePopup} >Reset Password</button>
    }

{/* <div className="centered-text">Or</div> */}

<div className="loginhelper">You remember your password ? <Link href={'/auth/login'}>Login</Link>  </div>


</div>
  )
}

export default Passwordreset