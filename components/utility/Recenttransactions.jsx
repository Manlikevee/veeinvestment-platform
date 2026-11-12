'use client'
import React, { useState } from 'react'
import Inputcomponent from '../Inputcomponent';
import Reusablepopup from './Reusablepopup';
import Investments_list from './Investments_list';

const Recenttransactions = () => {
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
    <div>
      {isOpen && (      <Reusablepopup 
        title="Action Successful" 
        subtext={<Investments_list/>} 
        close={handleClose} 
      />)}

  

      <div className="tflx">
      <div className="miniformdiv fh">
      <Inputcomponent 
        inputState={email} 
        setInputState={setEmail} 
        placeholder={'Search users by name, referral ID....'}
        inputType="text" 
        name="email" 
        id="email" 
    icontype={'search'}
      />
      </div>

      <button className='mybtn fh' onClick={togglePopup}> <span className="material-symbols-outlined">
add
</span> Add Investment</button>
      </div>
     


    </div>
  )
}

export default Recenttransactions