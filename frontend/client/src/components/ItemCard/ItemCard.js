import './ItemCard.css';
import { FaShoppingCart, FaRegBookmark, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';  
import { useState } from 'react'; 

export function ItemCard(props) {
  const [saved, setSaved] = useState(false); 
  const [currentImage, setCurrentImage] = useState(0); 
  const language = localStorage.getItem('language') || 'ar'; 
  
  const translations = {
    en: {
      size: 'Size',
      collection: "'s collection",
      quantity: 'Quantity',
      rentPerDay: '/Day',
      alertSuccess: 'Successfully added!',
      alertFailed: 'Failed to add item to cart',
      errorAdd: 'There was an error adding the item to the cart.',
      errorSave: 'There was an error saving the item.',
      rentLabel: 'Rent for',
    },
    ar: {
      size: 'الحجم',
      collection: 'مجموعة ',
      quantity: 'الكمية',
      rentPerDay: '/اليوم',
      alertSuccess: 'تمت الإضافة بنجاح!',
      alertFailed: 'فشل في إضافة العنصر إلى السلة',
      errorAdd: 'حدث خطأ أثناء إضافة العنصر إلى السلة.',
      errorSave: 'حدث خطأ أثناء حفظ العنصر.',
      rentLabel: 'استئجار لـ',
    },
  };

  const addToCart = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.post('http://localhost:3000/api/cart/add', 
        { itemId: props.id }, 
        { 
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      if (response.status === 200) {
        alert(translations[language].alertSuccess);
      } else {
        alert(translations[language].alertFailed);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert(translations[language].errorAdd);
    }
  };

  const saveItem = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.post('http://localhost:3000/api/items/saved', 
        { id: props.id }, 
        { 
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      if (response.status === 200) {
        setSaved(true); 
        alert(translations[language].alertSuccess);
      } else {
        alert(translations[language].alertFailed);
      }
    } catch (error) {
      console.error('Error saving item:', error);
      alert(translations[language].errorSave);
    }
  };

  const handleMouseEnter = () => {
    if (props.image && props.image.length > 1) {
      setCurrentImage((prevImage) => (prevImage + 1) % props.image.length);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImage(0); 
  };


  return (
    <div className='productsList'>
      <div key={props.id} className='productCard'>
        <Link to={`/item/${props.id}`}>
          <img 
            src={ props.image } 
            alt='product-img' 
            className='productImage'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </Link>

        <FaRegBookmark 
          className={"productCard__wishlist"} 
          onClick={saveItem}
          style={{ color: saved ? 'gold' : 'gray' }} 
        />
        
        <div className='productCard__content'>
          <h3 className='productName'>{props.name}</h3>
          <div className='displayStack__1'>
            <div className='productSales'>{translations[language].size} : {props.size}</div>
            {props.RentAble ? (
              <div className='productPrice'>₪ {props.price}{translations[language].rentPerDay}</div>
            ) : (
              <div className='productPrice'>₪ {props.price}</div>
            )}
          </div>
          <div className='displayStack__2'>
            <div className='productTime'>{props.brand} {translations[language].collection}</div>
            {props.RentAble ? (
              <div className='productTime'></div>
            ) : (
              <div className='productTime'>{translations[language].quantity}: {props.quantity}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
