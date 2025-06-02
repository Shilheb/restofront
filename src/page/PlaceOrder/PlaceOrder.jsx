import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext.jsx'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
   const [data, setData] = useState({
       street: "",
       city: "",
       state: "",
       zipcode: "",
       country: "",
       phone: ""
   })
   const { getTotalCartAmount, cartItems, clearCart } = useContext(StoreContext);
   const navigate = useNavigate();

   const onChangeHandler = (event) => {
       const { name, value } = event.target;
       setData(prev => ({ ...prev, [name]: value }))
   }

   const placeOrder = async () => {
       // Validation
       if (!data.street || !data.city || !data.state || !data.zipcode || !data.country || !data.phone) {
           alert('Please fill in all delivery details');
           return;
       }

       try {
           const articles = Object.entries(cartItems).map(([id, quantity]) => ({
               id: parseInt(id),
               quantity
           }));
   
           const userId = localStorage.getItem('user_id');
if (!userId) {
    alert('User not identified, please log in again.');
    navigate('/login');
    return;
}

const orderData = {
    user_id: userId,
    name: localStorage.getItem('username'),
    phone: data.phone,
    address: `${data.street}, ${data.city}, ${data.state} ${data.zipcode}, ${data.country}`,
    articles,
    total_amount: getTotalCartAmount() + 5, // Including delivery fee
    email: localStorage.getItem('email'),
};

           console.log(orderData);
           const response = await axios.post('http://127.0.0.1:8000/api/confirm-payment', orderData);
   
           if (response.data.status === 'success') {
               // Clear the cart after successful order
               clearCart();

               navigate('/order-confirmation', {
                   state: {
                       orderDetails: response.data.data
                   }
               });
           }
       } catch (error) {
           console.error('Order placement error:', error);
           alert(error.response?.data?.message || 'Failed to place order');
       }
   }

   useEffect(() => {
       if (getTotalCartAmount() === 0) {
           navigate('/')
       }
   }, [getTotalCartAmount, navigate])

   return (
       <div className='place-order'>
           <div className="place-order-left">
               <p className='title'>Delivery Information</p>
               <input 
                   type="text" 
                   name='street' 
                   onChange={onChangeHandler} 
                   value={data.street} 
                   placeholder='Street' 
                   required 
               />
               <div className="multi-field">
                   <input 
                       type="text" 
                       name='city' 
                       onChange={onChangeHandler} 
                       value={data.city} 
                       placeholder='City' 
                       required 
                   />
                   <input 
                       type="text" 
                       name='state' 
                       onChange={onChangeHandler} 
                       value={data.state} 
                       placeholder='State' 
                       required 
                   />
               </div>
               <div className="multi-field">
                   <input 
                       type="text" 
                       name='zipcode' 
                       onChange={onChangeHandler} 
                       value={data.zipcode} 
                       placeholder='Zip code' 
                       required 
                   />
                   <input 
                       type="text" 
                       name='country' 
                       onChange={onChangeHandler} 
                       value={data.country} 
                       placeholder='Country' 
                       required 
                   />
               </div>
               <input 
                   type="tel" 
                   name='phone' 
                   onChange={onChangeHandler} 
                   value={data.phone} 
                   placeholder='Phone' 
                   required 
               />
           </div>
           <div className="place-order-right">
               <div className="cart-total">
                   <h2>Cart Totals</h2>
                   <div>
                       <div className="cart-total-details">
                           <p>Subtotal</p>
                           <p>{getTotalCartAmount().toFixed(2)}DT</p>
                       </div>
                       <hr />
                       <div className="cart-total-details">
                           <p>Delivery Fee</p>
                           <p>{getTotalCartAmount() === 0 ? 0 : 5.00}DT</p>
                       </div>
                       <hr />
                       <div className="cart-total-details">
                           <b>Total</b>
                           <b>{getTotalCartAmount() === 0 ? 0 : (getTotalCartAmount() + 5).toFixed(2)}DT</b>
                       </div>
                   </div>
               </div>
               <div className="payment-options">
                   <h2>Select Payment Method</h2>
                   <div className="payment-option">
                       <img src={assets.selector_icon} alt="Payment Method" />
                       <p>COD ( Cash On Delivery )</p>
                   </div>
                   <button onClick={placeOrder}>PLACE ORDER</button>
               </div>
           </div>
       </div>
   )
}

export default PlaceOrder;