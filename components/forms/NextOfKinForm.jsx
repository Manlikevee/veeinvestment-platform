'use client';

import React, { useState } from 'react';
import Inputcomponent from '../Inputcomponent';
import Selectcomponent from '../Selectcomponent';

const NextOfKinForm = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [residentialAddress, setResidentialAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextOfKinData = {
      name,
      gender,
      nationality,
      relationship,
      phoneNumber,
      email,
      residentialAddress,
    };
    console.log('Next of Kin Information:', nextOfKinData);
  };

  return (
    <div className="miniformdiv biggerdiv">
      <h2 className="form-title">Investment Information</h2>

      <div className="reggrid">
        <Inputcomponent
          inputState={name}
          setInputState={setName}
          label="Name"
          inputType="text"
          name="name"
          id="name"
        />

        <Selectcomponent
          selectState={gender}
          setSelectState={setGender}
          label="Gender"
          options={['Male', 'Female', 'Other']}
          name="gender"
          id="gender"
        />

        <Selectcomponent
          selectState={nationality}
          setSelectState={setNationality}
          label="Nationality"
          options={['Nigerian', 'Ghanaian', 'Kenyan', 'Other']}
          name="nationality"
          id="nationality"
        />

        <Inputcomponent
          inputState={relationship}
          setInputState={setRelationship}
          label="Relationship"
          inputType="text"
          name="relationship"
          id="relationship"
        />

        <Inputcomponent
          inputState={phoneNumber}
          setInputState={setPhoneNumber}
          label="Phone Number"
          inputType="tel"
          name="phone-number"
          id="phone-number"
          placeholder="+234XXXXXXXXXX"
        />

        <Inputcomponent
          inputState={email}
          setInputState={setEmail}
          label="Email Address"
          inputType="email"
          name="email"
          id="email"
          placeholder="example@example.com"
        />

        <Inputcomponent
          inputState={residentialAddress}
          setInputState={setResidentialAddress}
          label="Residential Address"
          inputType="text"
          name="residential-address"
          id="residential-address"
        />
      </div>

  
    </div>
  );
};

export default NextOfKinForm;
