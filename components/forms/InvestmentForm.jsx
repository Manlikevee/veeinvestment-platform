'use client'
import React, { useState } from "react";
import Inputcomponent from '../Inputcomponent';

const InvestmentForm = () => {
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [tenor, setTenor] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [maturityDate, setMaturityDate] = useState("");
  const [interestPayable, setInterestPayable] = useState("");
  const [totalPayable, setTotalPayable] = useState("");

  return (
    <>
      <Inputcomponent 
        inputState={investmentAmount}
        setInputState={setInvestmentAmount}
        label="Investment Amount *"
        inputType="number"
        name="investmentAmount"
        id="investmentAmount"
        placeholder="N 0.00"
      />
      <Inputcomponent
        inputState={effectiveDate}
        setInputState={setEffectiveDate}
        label="Effective Date"
        inputType="date"
        name="effectiveDate"
        id="effectiveDate"
      />
      <Inputcomponent
        inputState={tenor}
        setInputState={setTenor}
        label="Tenor"
        inputType="number"
        name="tenor"
        id="tenor"
        placeholder="Tenor in days"
      />
      <Inputcomponent
        inputState={interestRate}
        setInputState={setInterestRate}
        label="Interest Rate"
        inputType="number"
        name="interestRate"
        id="interestRate"
        placeholder="1%"
      />
      <Inputcomponent
        inputState={maturityDate}
        setInputState={setMaturityDate}
        label="Maturity Date"
        inputType="date"
        name="maturityDate"
        id="maturityDate"
      />
      <Inputcomponent
        inputState={interestPayable}
        setInputState={setInterestPayable}
        label="Interest Payable at Maturity"
        inputType="number"
        name="interestPayable"
        id="interestPayable"
        placeholder="N 0.00"
        readOnly
      />
      <Inputcomponent
        inputState={totalPayable}
        setInputState={setTotalPayable}
        label="Total Payable at Maturity"
        inputType="number"
        name="totalPayable"
        id="totalPayable"
        placeholder="N 0.00"
        readOnly
      />
    </>
  );
};

export default InvestmentForm;
