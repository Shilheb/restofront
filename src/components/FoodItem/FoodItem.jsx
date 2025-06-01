import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext.jsx';

const FoodItem = ({ image, name, price, desc, id }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      await addToCart(id);
      // Add a small delay for visual feedback
      setTimeout(() => setIsLoading(false), 300);
    } catch (err) {
      console.error('Error adding to cart:', err);
      setIsLoading(false);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      setIsLoading(true);
      await removeFromCart(id);
      setTimeout(() => setIsLoading(false), 300);
    } catch (err) {
      console.error('Error removing from cart:', err);
      setIsLoading(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  return (
    <div className={`food-item ${isLoading ? 'loading' : ''} fade-in`}>
      <div className='food-item-img-container'>
        {!imageLoaded && (
          <div className="food-item-image loading-skeleton"></div>
        )}
        <img
          className={`food-item-image ${imageLoaded ? 'loaded' : ''}`}
          src={image ? `data:image/png;base64,${image}` : assets.fallback_image}
          alt={name}
          onLoad={handleImageLoad}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
        {!cartItems[id] ? (
          <img
            className='add'
            onClick={handleAddToCart}
            src={assets.add_icon_white}
            alt="Add to cart"
            aria-label={`Add ${name} to cart`}
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              onClick={handleRemoveFromCart}
              alt="Remove from cart"
              aria-label={`Remove one ${name} from cart`}
            />
            <p className="bounce">{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              onClick={handleAddToCart}
              alt="Add more"
              aria-label={`Add more ${name} to cart`}
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p title={name}>{name}</p>
          <img src={assets.rating_starts} alt={`Rating for ${name}`} />
        </div>
        <p className="food-item-desc" title={desc}>{desc}</p>
        <p className="food-item-price">{formatPrice(price)}</p>
      </div>
    </div>
  );
};

export default FoodItem;
