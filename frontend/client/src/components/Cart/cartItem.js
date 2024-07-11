import React from 'react';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="cart-item">
      <img className='cartItemImage' src={item.image} alt={item.name} />
      <div>
        <h4>{item.name}</h4>
        <p>Price : ${item.price}</p>
        <p>Received Date : {item.received_date}</p>
        <p>Return Date : {item.Return_date}</p>
       
        <button className='removeBtn' onClick={() => onRemove(item.id)}>Remove</button>
      </div>
      <hr/>
    </div>
  );
};

export default CartItem;
