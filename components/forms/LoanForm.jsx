'use client';
import React, { useState } from "react";
import Inputcomponent from "../Inputcomponent";
import Selectcomponent from "../Selectcomponent";

const LoanForm = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [tenor, setTenor] = useState("");
  const [amount, setAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [repaymentSource, setRepaymentSource] = useState("");
  const [totalRepayment, setTotalRepayment] = useState("");
  const [monthlyRepayment, setMonthlyRepayment] = useState("");

  const loanPurposeOptions = [
    "Education",
    "Business",
    "Personal",
    "Medical",
    "Others",
  ];
  const repaymentSourceOptions = [
    "Salary",
    "Business Income",
    "Other Sources",
  ];

  return (
    <>
      <Inputcomponent
        inputState={loanAmount}
        setInputState={setLoanAmount}
        label="Loan Amount *"
        inputType="number"
        name="loanAmount"
        id="loanAmount"
        placeholder="N 0.00"
      />
      <Inputcomponent
        inputState={tenor}
        setInputState={setTenor}
        label="Tenor"
        inputType="number"
        name="tenor"
        id="tenor"
        placeholder="Enter tenor in months"
      />
      <Inputcomponent
        inputState={amount}
        setInputState={setAmount}
        label="Amount"
        inputType="number"
        name="amount"
        id="amount"
        placeholder="N 0.00"
      />
      <Selectcomponent
        selectState={loanPurpose}
        setSelectState={setLoanPurpose}
        label="Loan Purpose"
        options={loanPurposeOptions}
        name="loanPurpose"
        id="loanPurpose"
      />
      <Selectcomponent
        selectState={repaymentSource}
        setSelectState={setRepaymentSource}
        label="Repayment Source"
        options={repaymentSourceOptions}
        name="repaymentSource"
        id="repaymentSource"
      />
      <Inputcomponent
        inputState={totalRepayment}
        setInputState={setTotalRepayment}
        label="Total Repayment"
        inputType="number"
        name="totalRepayment"
        id="totalRepayment"
        placeholder="N 0.00"
        readOnly
      />
      <Inputcomponent
        inputState={monthlyRepayment}
        setInputState={setMonthlyRepayment}
        label="Monthly Repayment"
        inputType="number"
        name="monthlyRepayment"
        id="monthlyRepayment"
        placeholder="N 0.00"
        readOnly
      />
    </>
  );
};

export default LoanForm;
