import React from 'react';

export default function PurchaseCancellation({ money, moneyBack, lastPurchased }) {
  return (
    // Disable only if no money and no selection
    <button onClick={moneyBack} className="btn btn-dispense" disabled={!money && !lastPurchased} >
    {lastPurchased ? `Dispense and Get Change`: money ? "Cancel Purchase" : "Insert Money First"}
    </button>
  );
}
