import React from 'react';

export default function Inventory({ money }) {	
  // Display the current balance
  return <div className="balance-display">${money / 100}</div>;		
}
