import React from 'react';
import VendingItem from './VendingItem';

export default function ProductSelection({ items, purchaseItem }) {
  return (
    <div className="row items-container">
      {/* Map through the items array and render a VendingItem for each item */}
      {items.map((item, i) => (
        <VendingItem key={i} item={item} i={i} purchaseItem={purchaseItem} />
      ))}
    </div>
  );
}
