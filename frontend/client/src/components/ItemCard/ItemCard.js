import './ItemCard.css'; 
import { FaShoppingCart, FaRegBookmark, FaStar} from 'react-icons/fa';
export function ItemCard(props) {
    return(
        <div className='productsList'>
            <div key={props.id} className='productCard'>
                <img src={props.image} alt='product-img' className='productImage'></img>

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
                        <div className='pro/ductRating'>
                            {[...Array(props.rating)].map((index) => (
                                <FaStar id={index + 1 } key={index} />
                            ))}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ItemCard;