'use client';

import React, { useState } from 'react';
import Inputcomponent from '../Inputcomponent';

const BankInfoForm = () => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [bvn, setBvn] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const bankData = {
      bankName,
      accountNumber,
      accountName,
      bvn,
    };
    console.log('Bank Information:', bankData);
  };

  return (
    <div className="miniformdiv biggerdiv">

      <h2 className="form-title">Bank Information</h2>

      <div className="reggrid">
        <Inputcomponent
          inputState={bankName}
          setInputState={setBankName}
          label="Bank Name"
          inputType="text"
          name="bank-name"
          id="bank-name"
        />

        <Inputcomponent
          inputState={accountNumber}
          setInputState={setAccountNumber}
          label="Account Number"
          inputType="text"
          name="account-number"
          id="account-number"
        />

        <Inputcomponent
          inputState={accountName}
          setInputState={setAccountName}
          label="Account Name"
          inputType="text"
          name="account-name"
          id="account-name"
        />

        <Inputcomponent
          inputState={bvn}
          setInputState={setBvn}
          label="BVN"
          inputType="text"
          name="bvn"
          id="bvn"
        />
      </div>


    </div>
  );
};

export default BankInfoForm;
