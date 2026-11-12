import React from 'react';

const Valuebox = ({ label, body, currency }) => {
  // Format the value as currency
  const formatCurrency = (value, currencySymbol) => {
    if (!currencySymbol) return value; // Return raw value if no currency symbol provided

    try {
      // Use Intl.NumberFormat for proper formatting, but prepend the symbol
      return `${currencySymbol}${new Intl.NumberFormat('en-US').format(value)}`;
    } catch {
      return `${currencySymbol}${value}`; // Fallback formatting if Intl fails
    }
  };

  return (
    <div className="valuebox">
      <div className="valueboxlabel">{label}</div>
      <div className="valueboxvalue">
        {isNaN(body) ? body : formatCurrency(body, currency)} {/* Format if body is a number */}
      </div>
    </div>
  );
};

export default Valuebox;
