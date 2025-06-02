import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Get order details from navigation state
    if (location.state && location.state.orderDetails) {
      setOrderDetails(location.state.orderDetails);
    } else {
      // If no order details, redirect to home
      navigate('/');
    }
  }, [location.state, navigate]);

  if (!orderDetails) {
    return (
      <div className="order-confirmation">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  const { payment, articles } = orderDetails;

  return (
    <div className="order-confirmation">
      <div className="confirmation-container">
        <div className="success-icon">
          <div className="checkmark">✓</div>
        </div>
        
        <h1>Order Confirmed!</h1>
        <p className="confirmation-message">
          Thank you for your order! Your food is being prepared and will be delivered soon.
        </p>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-info">
            <div className="info-row">
              <span className="label">Order ID:</span>
              <span className="value">#{payment.id}</span>
            </div>
            <div className="info-row">
              <span className="label">Customer:</span>
              <span className="value">{payment.name}</span>
            </div>
            <div className="info-row">
              <span className="label">Phone:</span>
              <span className="value">{payment.phone}</span>
            </div>
            <div className="info-row">
              <span className="label">Delivery Address:</span>
              <span className="value">{payment.address}</span>
            </div>
            <div className="info-row">
              <span className="label">Status:</span>
              <span className="value status-pending">{payment.status}</span>
            </div>
          </div>

          <div className="order-items">
            <h3>Items Ordered</h3>
            {articles.map((item, index) => (
              <div key={index} className="order-item">
                <div className="item-details">
                  <span className="item-name">Item #{item.id}</span>
                  <span className="item-quantity">Quantity: {item.quantity}</span>
                </div>
                <div className="item-pricing">
                  <span className="item-price">{item.price.toFixed(2)} DT each</span>
                  <span className="item-total">{item.total.toFixed(2)} DT</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total-section">
            <div className="total-row">
              <span className="total-label">Total Amount:</span>
              <span className="total-amount">{payment.total_amount.toFixed(2)} DT</span>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <Link to="/myorder" className="btn-primary">
            Track Your Order
          </Link>
          <Link to="/menu" className="btn-secondary">
            Continue Shopping
          </Link>
        </div>

        <div className="delivery-info">
          <h3>What's Next?</h3>
          <div className="delivery-steps">
            <div className="step active">
              <div className="step-icon">1</div>
              <div className="step-text">
                <strong>Order Confirmed</strong>
                <p>We've received your order</p>
              </div>
            </div>
            <div className="step">
              <div className="step-icon">2</div>
              <div className="step-text">
                <strong>Preparing</strong>
                <p>Our chefs are preparing your food</p>
              </div>
            </div>
            <div className="step">
              <div className="step-icon">3</div>
              <div className="step-text">
                <strong>On the Way</strong>
                <p>Your order is being delivered</p>
              </div>
            </div>
            <div className="step">
              <div className="step-icon">4</div>
              <div className="step-text">
                <strong>Delivered</strong>
                <p>Enjoy your meal!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
