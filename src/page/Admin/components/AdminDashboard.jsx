import React, { useState } from 'react';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('products');

  const tabs = [
    { id: 'products', name: 'Products', icon: '🍽️' },
    { id: 'categories', name: 'Categories', icon: '📂' },
    { id: 'restaurant', name: 'Restaurant Info', icon: '🏪' },
    { id: 'analytics', name: 'Analytics', icon: '📊' }
  ];

  const stats = [
    { label: 'Total Products', value: '48', change: '+5', trend: 'up' },
    { label: 'Active Categories', value: '8', change: '+1', trend: 'up' },
    { label: 'Orders Today', value: '23', change: '+12', trend: 'up' },
    { label: 'Revenue Today', value: '$1,247', change: '+8%', trend: 'up' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'products':
        return (
          <div className="products-content">
            <div className="content-header">
              <h2>Product Management</h2>
              <button className="add-btn">+ Add New Product</button>
            </div>
            <div className="products-grid">
              <div className="product-card">
                <img src="/api/placeholder/200/150" alt="Product" />
                <div className="product-info">
                  <h3>Truffle Arancini</h3>
                  <p>$16.00</p>
                  <span className="status active">Active</span>
                </div>
                <div className="product-actions">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
              <div className="product-card">
                <img src="/api/placeholder/200/150" alt="Product" />
                <div className="product-info">
                  <h3>Wagyu Beef Tenderloin</h3>
                  <p>$65.00</p>
                  <span className="status active">Active</span>
                </div>
                <div className="product-actions">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'categories':
        return (
          <div className="categories-content">
            <div className="content-header">
              <h2>Category Management</h2>
              <button className="add-btn">+ Add New Category</button>
            </div>
            <div className="categories-list">
              <div className="category-item">
                <span className="category-icon">🥗</span>
                <span className="category-name">Appetizers</span>
                <span className="category-count">8 items</span>
                <div className="category-actions">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
              <div className="category-item">
                <span className="category-icon">🍖</span>
                <span className="category-name">Main Courses</span>
                <span className="category-count">12 items</span>
                <div className="category-actions">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'restaurant':
        return (
          <div className="restaurant-content">
            <h2>Restaurant Information</h2>
            <form className="restaurant-form">
              <div className="form-group">
                <label>Restaurant Name</label>
                <input type="text" defaultValue="Chef's Table" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea defaultValue="Fine dining experience with exceptional cuisine"></textarea>
              </div>
              <div className="form-group">
                <label>Address</label>
                <input type="text" defaultValue="123 Culinary Street, Downtown" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
              <button type="submit" className="save-btn">Save Changes</button>
            </form>
          </div>
        );
      case 'analytics':
        return (
          <div className="analytics-content">
            <h2>Analytics Dashboard</h2>
            <div className="analytics-grid">
              <div className="chart-placeholder">
                <h3>📈 Sales Trends</h3>
                <p>Revenue analytics over time</p>
              </div>
              <div className="chart-placeholder">
                <h3>🎯 Popular Items</h3>
                <p>Most ordered menu items</p>
              </div>
              <div className="chart-placeholder">
                <h3>👥 Customer Insights</h3>
                <p>Customer behavior patterns</p>
              </div>
              <div className="chart-placeholder">
                <h3>⏰ Peak Hours</h3>
                <p>Busiest times of day</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Admin Dashboard</h1>
            <p>Manage your restaurant efficiently</p>
          </div>
          <div className="header-right">
            <div className="admin-profile">
              <span className="admin-avatar">👤</span>
              <span className="admin-name">Admin User</span>
            </div>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
              <div className={`stat-change ${stat.trend}`}>
                <span className="change-icon">
                  {stat.trend === 'up' ? '↗️' : '↘️'}
                </span>
                <span className="change-value">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Sidebar Navigation */}
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="nav-icon">{tab.icon}</span>
                <span className="nav-text">{tab.name}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="dashboard-main">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
