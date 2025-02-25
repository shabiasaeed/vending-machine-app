import React from 'react';

export default function VendingItem({ purchaseItem, item, i }) {
  return (
    <div className="col-xs-6 col-sm-3">
      {item.stock ? 
        <div className="items-left bg-success text-success">Available: {item.stock}</div> : 
        <div className="items-left bg-danger text-danger">Out of Stock</div>
      }
      <br></br>
      <img className="img-responsive center-block img-max-150" src={item.imgUrl} alt={item.itemName} />
      <div className="item bg-warning text-warning">{item.itemName}</div>
      <div className="item-price bg-info text-info">Price: ${item.price / 100}</div>
      <br></br>
      <a onClick={purchaseItem} data-value={item.itemName} className="btn-purchase">Buy</a>
    </div>
  );
}
