import React from 'react';

const Selectcomponent = ({ selectState, setSelectState, label, options, name, id }) => {
  return (
    <div className="miniforminput">
      {label && <label htmlFor={label}>{label}</label>}

      <div className="miniforminputdata">
        <select
          name={name}
          id={id}
          value={selectState}
          onChange={(e) => setSelectState(e.target.value)}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Selectcomponent;
