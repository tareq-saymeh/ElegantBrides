import './ItemCard.css';
import { FaShoppingCart, FaRegBookmark } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function ItemCard(props) {
  const [saved, setSaved] = useState(false);
  const [available, setAvailable] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const language = localStorage.getItem('language') || 'ar';

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/custom/get-customization');
        const headerColor = response.data.headerColor;
  
        // Apply the header color to all elements with the class 'weddingDressCard'
        const cards = document.querySelectorAll('.weddingDressCard');
        cards.forEach(card => {
          card.style.backgroundColor = headerColor;
        });
  
        // Apply the header color to all elements with the class 'weddingDressCard__actions'
        const actionCards = document.querySelectorAll('.weddingDressCard__actions');
        actionCards.forEach(actionCard => {
          actionCard.style.backgroundColor = headerColor;
        });
  
      } catch (error) {
        console.error('Error fetching the logo and customization:', error);
      }
    };
  
    fetchLogo();
  }, []);
  

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
        { itemId: props.id  },
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
        { id: props.id 
        },
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

 // useEffect

  return (
    <div className="weddingDressCard">
      <Link to={`/item/${props.id}`}>
        <img
          src={props.image}
          alt={props.name}
          className="weddingDressCard__image"
          loading="lazy"
        />
      </Link>
      <div className="weddingDressCard__content">
        <h3 className="weddingDressCard__name">{props.name}</h3>
        <p className="weddingDressCard__designer">{props.designer}</p>
        <div className="weddingDressCard__price">
          ₪ {props.price} {props.RentAble ? translations[language].rentPerDay : ''}
        </div>
        <p className={`weddingDressCard__availability ${props.available ? 'available' : 'available'}`}>
          { 'Available' }
        </p>
      </div>
      <div className="weddingDressCard__actions">
        <FaRegBookmark
          className={`saved_icon weddingDressCard__icon saved_icon `}
          onClick={saveItem}
          
        />
        <FaShoppingCart className="weddingDressCard__icon" onClick={addToCart} />
      </div>
    </div>
  );
}

export default ItemCard;
