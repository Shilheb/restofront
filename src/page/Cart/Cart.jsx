import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext.jsx'
import { useNavigate, Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Cart = () => {

  const {cartItems, food_list, foodList, removeFromCart, getTotalCartAmount} = useContext(StoreContext);
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  // Use dynamic foodList from API, fallback to static food_list
  const currentFoodList = foodList.length > 0 ? foodList : food_list;
  const cartItemsArray = currentFoodList.filter(item =>
    cartItems[item.id] > 0 || cartItems[item.food_id] > 0
  );
  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 5;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryFee - discount;

  const handlePromoSubmit = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
    }
  };

  if (cartItemsArray.length === 0) {
    return (
      <div className='cart'>
        <div className="cart-header">
          <h1>Your Cart</h1>
          <p>Your cart is currently empty</p>
        </div>
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet. Start shopping to fill it up!</p>
          <Link to="/" className="btn">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className='cart'>
      <div className="cart-header">
        <h1>Your Cart</h1>
        <p>{cartItemsArray.length} item{cartItemsArray.length !== 1 ? 's' : ''} in your cart</p>
      </div>

      <div className="cart-items">
        <div className="cart-items-title">
          <p>Image</p>
          <p>Item</p>
          <p>Price</p>
          <p>Qty</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        {cartItemsArray.map((item, index) => {
          const itemId = item.id || item.food_id;
          const itemName = item.name || item.food_name;
          const itemPrice = item.price || item.food_price;
          const itemImage = item.image ? `data:image/jpeg;base64,${item.image}` : (item.food_image || assets.fallback_image);
          const quantity = cartItems[itemId];

          return (
            <div key={itemId} className="cart-items-item">
              <img
                src={itemImage}
                alt={itemName}
              />
              <div className="cart-item-name">{itemName}</div>
              <div className="cart-item-price">{parseFloat(itemPrice).toFixed(2)} DT</div>
              <div className="cart-item-quantity">{quantity}</div>
              <div className="cart-item-total">{(itemPrice * quantity).toFixed(2)} DT</div>
              <button
                className='cart-items-remove-icon'
                onClick={() => removeFromCart(itemId)}
                aria-label={`Remove ${itemName} from cart`}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-promocode">
          <h3>Promo Code</h3>
          <p>Have a promo code? Enter it here to get a discount!</p>
          <div className="cart-promocode-input">
            <input
              type="text"
              placeholder='Enter promo code (try: SAVE10)'
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button onClick={handlePromoSubmit}>Apply</button>
          </div>
          {promoApplied && (
            <p style={{color: 'var(--success)', marginTop: 'var(--space-3)'}}>
              ✓ Promo code applied! 10% discount
            </p>
          )}
        </div>

        <div className="cart-total">
          <h2>Order Summary</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>{subtotal.toFixed(2)} DT</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>{deliveryFee.toFixed(2)} DT</p>
          </div>
          {promoApplied && (
            <>
              <hr />
              <div className="cart-total-details">
                <p>Discount (10%)</p>
                <p style={{color: 'var(--success)'}}>-{discount.toFixed(2)} DT</p>
              </div>
            </>
          )}
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>{total.toFixed(2)} DT</b>
          </div>
          <button onClick={() => navigate('/order')}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart