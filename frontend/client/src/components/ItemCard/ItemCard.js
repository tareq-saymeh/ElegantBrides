import './ItemCard.css'; 
import { FaShoppingCart, FaRegBookmark, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';  // Import axios for making HTTP requests
import { useState } from 'react'; // Import useState for managing state

export function ItemCard(props) {
  const [saved, setSaved] = useState(false); // State to track if item is saved

  const addToCart = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.post('http://localhost:3000/api/cart/add', 
        { itemId: props.id }, 
        { 
          headers: { 'Authorization': `Bearer ${token}` } // Include token in request header
        }
      );
      if (response.status === 200) {
        alert('successfully!');
      } else {
        alert('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('There was an error adding the item to the cart.');
    }
  };

  const saveItem = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.post('http://localhost:3000/api/items/saved', 
        { id: props.id }, 
        { 
          headers: { 'Authorization': `Bearer ${token}` } // Include token in request header
        }
      );
      if (response.status === 200) {
        setSaved(true); // Update saved state
        alert('successfully!');
      } else {
        alert('Failed to save item');
      }
    } catch (error) {
      console.error('Error saving item:', error);
      alert('There was an error saving the item.');
    }
  };

  return (
    <div className='productsList'>
      <div key={props.id} className='productCard'>
        <Link to={`/item/${props.id}`}>
          <img src={props.image} alt='product-img' className='productImage'></img>
        </Link>

        {/* Connect the addToCart function to the onClick event */}
        <FaShoppingCart className={"productCard__cart"} onClick={addToCart} />
        <FaRegBookmark 
          className={"productCard__wishlist"} 
          onClick={saveItem}
          style={{ color: saved ? 'gold' : 'gray' }} // Change color if saved
        />
        
        <div className='productCard__content'>
          <h3 className='productName'>{props.name}</h3>
          <div className='displayStack__1'>
            <div className='productSales'>Size : {props.size} </div>
            {props.RentAble  ? (
              <div className='productPrice'>${props.price}/Day</div>
            ) : (
              <div className='productPrice'>${props.price}</div>
            )}
          </div>
          <div className='displayStack__2'>
            <div className='productTime'>{props.brand}'s collection</div>
            {props.RentAble  ? (
              <div className='productTime'>  </div>
            ) : (
              <div className='productTime'> quantity: {props.quantity}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
