// ItemCard.js
import './ItemCard.css'; 
import { FaShoppingCart, FaRegBookmark, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export function ItemCard(props) {
  return (
    <div className='productsList'>
      <div key={props.id} className='productCard'>
        <Link to={`/item/${props.id}`}>
          <img src={props.image} alt='product-img' className='productImage'></img>
        </Link>

        <FaShoppingCart className={"productCard__cart"} />
        <FaRegBookmark className={"productCard__wishlist"} />
        
        <div className='productCard__content'>
          <h3 className='productName'>{props.name}</h3>
          <div className='displayStack__1'>
            <div className='productSales'>Size : {props.size} </div>
            <div className='productPrice'>${props.price}/Day</div>
          </div>
          <div className='displayStack__2'>
            <div className='productTime'>{props.collection}'s collection</div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemCard;
