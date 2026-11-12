'use client';

import React, { useState } from 'react';
import Inputcomponent from '../Inputcomponent';
import Mylogocomponent from '../Mylogocomponent';

const PersonalInfoComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [nationality, setNationality] = useState('');
  const [stateOfOrigin, setStateOfOrigin] = useState('');
  const [localGovt, setLocalGovt] = useState('');
  const [religion, setReligion] = useState('');
  const [motherMaidenName, setMotherMaidenName] = useState('');
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [howDidYouHear, setHowDidYouHear] = useState('');
  const [residentialAddress, setResidentialAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFileUpload = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  return (
    <div className="miniformdiv biggerdiv">
      <h2 className="form-title">Personal Information</h2>


      <div className="reggrid">
        <Inputcomponent inputState={firstName} setInputState={setFirstName} label="First Name" inputType="text" name="firstname" id="firstname" />
        <Inputcomponent inputState={middleName} setInputState={setMiddleName} label="Middle Name" inputType="text" name="middlename" id="middlename" />
        <Inputcomponent inputState={lastName} setInputState={setLastName} label="Last Name" inputType="text" name="lastname" id="lastname" />
        <Inputcomponent inputState={email} setInputState={setEmail} label="Email Address" inputType="email" name="email" id="email" />
        <Inputcomponent inputState={phoneNumber} setInputState={setPhoneNumber} label="Phone Number" inputType="tel" name="phone" id="phone" />
        <Inputcomponent inputState={dateOfBirth} setInputState={setDateOfBirth} label="Date of Birth" inputType="date" name="dob" id="dob" />
        <Inputcomponent inputState={gender} setInputState={setGender} label="Gender" inputType="text" name="gender" id="gender" />
        <Inputcomponent inputState={maritalStatus} setInputState={setMaritalStatus} label="Marital Status" inputType="text" name="marital-status" id="marital-status" />
        <Inputcomponent inputState={nationality} setInputState={setNationality} label="Nationality" inputType="text" name="nationality" id="nationality" />
        <Inputcomponent inputState={stateOfOrigin} setInputState={setStateOfOrigin} label="State of Origin" inputType="text" name="state-of-origin" id="state-of-origin" />
        <Inputcomponent inputState={localGovt} setInputState={setLocalGovt} label="Local Government" inputType="text" name="local-govt" id="local-govt" />
        <Inputcomponent inputState={religion} setInputState={setReligion} label="Religion" inputType="text" name="religion" id="religion" />
        <Inputcomponent inputState={motherMaidenName} setInputState={setMotherMaidenName} label="Mother's Maiden Name" inputType="text" name="mother-maiden-name" id="mother-maiden-name" />
        <Inputcomponent inputState={idType} setInputState={setIdType} label="ID Type" inputType="text" name="id-type" id="id-type" />
        <Inputcomponent inputState={idNumber} setInputState={setIdNumber} label="ID Number" inputType="text" name="id-number" id="id-number" />
        <Inputcomponent inputState={howDidYouHear} setInputState={setHowDidYouHear} label="How Did You Hear About Us" inputType="text" name="how-did-you-hear" id="how-did-you-hear" />
        <Inputcomponent inputState={residentialAddress} setInputState={setResidentialAddress} label="Residential Address" inputType="text" name="residential-address" id="residential-address" />
        <div className="file-upload">
          <label htmlFor="profile-picture">Upload Profile Picture</label>
          <input type="file" name="profile-picture" id="profile-picture" onChange={handleFileUpload} />
        </div>
      </div>


    </div>
  );
};

export default PersonalInfoComponent;
