import React, { useState, useEffect } from 'react'
import './MyOrders.css'
import { API_ENDPOINTS } from '../../config/api'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        navigate('/');
        return;
      }

      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.USER_ORDERS(userId));

      if (response.data.status === 'success') {
        // Transform the data to match the expected format
        const transformedOrders = response.data.data.map(order => ({
          id: order.id,
          date: order.created_at,
          status: getStatusDisplay(order.status),
          total: order.total_amount,
          items: order.items || []
        }));
        setOrders(transformedOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Keep orders empty if there's an error
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusDisplay = (status) => {
    const statusMap = {
      'pending': 'Pending',
      'confirmed': 'Confirmed',
      'preparing': 'Preparing',
      'on_the_way': 'On the way',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'var(--success)';
      case 'On the way': return 'var(--info)';
      case 'Preparing': return 'var(--warning)';
      case 'Confirmed': return 'var(--primary)';
      case 'Pending': return 'var(--secondary)';
      case 'Cancelled': return 'var(--error)';
      default: return 'var(--gray-500)';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return '✅';
      case 'On the way': return '🚚';
      case 'Preparing': return '👨‍🍳';
      case 'Confirmed': return '✔️';
      case 'Pending': return '⏳';
      case 'Cancelled': return '❌';
      default: return '📦';
    }
  };

  if (loading) {
    return (
      <div className="my-orders">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>Loading your order history...</p>
        </div>
        <div className="orders-loading">
          {Array(3).fill(0).map((_, index) => (
            <div key={index} className="order-skeleton">
              <div className="skeleton-header"></div>
              <div className="skeleton-content"></div>
              <div className="skeleton-footer"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="my-orders">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>Your order history</p>
        </div>
        <div className="orders-empty">
          <div className="empty-icon">📦</div>
          <h2>No orders yet</h2>
          <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
          <a href="/" className="btn-primary">Start Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="my-orders">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track and manage your orders</p>
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <h3>Order #{order.id}</h3>
                <p className="order-date">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="order-status" style={{ color: getStatusColor(order.status) }}>
                <span className="status-icon">{getStatusIcon(order.status)}</span>
                <span className="status-text">{order.status}</span>
              </div>
            </div>

            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">x{item.quantity}</span>
                  <span className="item-price">{item.price.toFixed(2)} DT</span>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div className="order-total">
                <strong>Total: {order.total.toFixed(2)} DT</strong>
              </div>
              <div className="order-actions">
                {order.status === 'Delivered' && (
                  <button className="btn-secondary">Reorder</button>
                )}
                <button className="btn-outline">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders