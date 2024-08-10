import './ItemCard.css'; 
import { FaShoppingCart, FaRegBookmark, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';  // Import axios for making HTTP requests

export function ItemCard(props) {

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
        alert('Item added to cart successfully!');
      } else {
        alert('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('There was an error adding the item to the cart.');
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
        <FaRegBookmark className={"productCard__wishlist"} />
        
        <div className='productCard__content'>
          <h3 className='productName'>{props.name}</h3>
          <div className='displayStack__1'>
            <div className='productSales'>Size : {props.size} </div>
            <div className='productPrice'>${props.price}/Day</div>
          </div>
          <div className='displayStack__2'>
            <div className='productTime'>{props.brand}'s collection</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemCard;
