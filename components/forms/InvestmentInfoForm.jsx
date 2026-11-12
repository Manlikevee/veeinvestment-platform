'use client';

import React, { useState } from 'react';
import Inputcomponent from '../Inputcomponent';

const InvestmentInfoForm = () => {
  const [occupation, setOccupation] = useState('');
  const [employer, setEmployer] = useState('');
  const [sourceOfIncome, setSourceOfIncome] = useState('');
  const [riskTolerance, setRiskTolerance] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [investmentObjective, setInvestmentObjective] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const investmentData = {
      occupation,
      employer,
      sourceOfIncome,
      riskTolerance,
      officeAddress,
      investmentObjective,
    };
    console.log('Investment Information:', investmentData);
  };

  return (
    <div className="miniformdiv biggerdiv">
      <h2 className="form-title">Investment Information</h2>

      <div className="reggrid">
        <Inputcomponent
          inputState={occupation}
          setInputState={setOccupation}
          label="Occupation"
          inputType="text"
          name="occupation"
          id="occupation"
        />

        <Inputcomponent
          inputState={employer}
          setInputState={setEmployer}
          label="Employer"
          inputType="text"
          name="employer"
          id="employer"
        />

        <Inputcomponent
          inputState={sourceOfIncome}
          setInputState={setSourceOfIncome}
          label="Source of Income"
          inputType="text"
          name="source-of-income"
          id="source-of-income"
        />

        <Inputcomponent
          inputState={riskTolerance}
          setInputState={setRiskTolerance}
          label="Risk Tolerance"
          inputType="text"
          name="risk-tolerance"
          id="risk-tolerance"
        />

        <Inputcomponent
          inputState={officeAddress}
          setInputState={setOfficeAddress}
          label="Office Address"
          inputType="text"
          name="office-address"
          id="office-address"
        />

        <Inputcomponent
          inputState={investmentObjective}
          setInputState={setInvestmentObjective}
          label="Investment Objective"
          inputType="text"
          name="investment-objective"
          id="investment-objective"
        />
      </div>

</div>
 
  );
};

export default InvestmentInfoForm;
