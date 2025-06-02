import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]); // State for products
  const [categories, setCategories] = useState([]); // State for categories
  const [stats, setStats] = useState({ // State for dynamic stats
    totalProducts: '...',
    activeCategories: '...',
    ordersToday: '...',
    revenueToday: '...',
  });
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [statsLoading, setStatsLoading] = useState(true); // Loading state for stats
  const [statsError, setStatsError] = useState(null); // Error state for stats
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null
  });

  const tabs = [
    { id: 'products', name: 'Products', icon: '🍽️' },
    { id: 'categories', name: 'Categories', icon: '📂' },
    { id: 'orders', name: 'Orders', icon: '📦' },
    { id: 'analytics', name: 'Analytics', icon: '📊' }
  ];

  // Fetch main data based on active tab
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (activeTab === 'products') {
          const response = await axios.get('http://localhost:8000/api/articles');
          setProducts(response.data.data || []);
        } else if (activeTab === 'categories') {
          // Categories are now fetched on mount, so no need to fetch here
          // setCategories(response.data.data || []);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setError('You have no access to this operation');
        } else {
          setError('Failed to fetch data. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  // Fetch categories and stats data on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      setStatsLoading(true);
      setStatsError(null);
      try {
        // Fetch categories
        const categoriesResponse = await axios.get('http://localhost:8000/api/categories');
        setCategories(categoriesResponse.data.data || []);

        // Fetch products count for stats
        const productsResponse = await axios.get('http://localhost:8000/api/articles');
        
        setStats({
          totalProducts: productsResponse.data.data?.length || 0,
          activeCategories: categoriesResponse.data.data?.length || 0,
          ordersToday: '0', // Placeholder until orders API is implemented
          revenueToday: '$0' // Placeholder until revenue API is implemented
        });
      } catch (err) {
        console.error('Error fetching initial data:', err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setStatsError('You have no access to this operation');
        } else {
          setStatsError('Failed to fetch initial data');
        }
      } finally {
        setStatsLoading(false);
      }
    };

    fetchInitialData();
  }, []); // Empty dependency array means this runs once on mount

  // Handle product operations
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const apiUrl = editingProduct 
        ? `http://localhost:8000/api/articles/${editingProduct.id}` 
        : 'http://localhost:8000/api/articles';
      
      const method = editingProduct ? 'put' : 'post';

      // Create FormData for file upload
      const dataToSend = new FormData();
      dataToSend.append('name', formData.name);
      dataToSend.append('description', formData.description);
      dataToSend.append('price', formData.price);
      dataToSend.append('category_id', formData.category); // Use category_id
      if (formData.image) {
        dataToSend.append('image', formData.image);
      }

      await axios({
        method: method,
        url: apiUrl,
        data: dataToSend,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // Needed for file upload
        }
      });

      // Refresh products list after save
      const response = await axios.get('http://localhost:8000/api/articles');
      setProducts(response.data.data || []);

      // Update stats
      const productsResponse = await axios.get('http://localhost:8000/api/articles');
      setStats(prevStats => ({
        ...prevStats,
        totalProducts: productsResponse.data.data?.length || 0,
      }));

      setShowProductForm(false);
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '', category: '', image: null });
    } catch (err) {
      console.error('Error saving product:', err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError('You have no access to this operation');
      } else {
        setError('Failed to save product. Please try again.');
      }
    }
  };

  const handleProductDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8000/articles/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Refresh products list
        const response = await axios.get('http://localhost:8000/api/articles');
        setProducts(response.data.data || []);

        // Update stats
        const productsResponse = await axios.get('http://localhost:8000/api/articles');
        setStats(prevStats => ({
          ...prevStats,
          totalProducts: productsResponse.data.data?.length || 0,
        }));

      } catch (err) {
        console.error('Error deleting product:', err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setError('You have no access to this operation');
        } else {
          setError('Failed to delete product. Please try again.');
        }
      }
    }
  };

  // Handle category operations
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const apiUrl = editingCategory
        ? `http://localhost:8000/categories/${editingCategory.id}`
        : 'http://localhost:8000/categories';
      
      const method = editingCategory ? 'put' : 'post';

      await axios({
        method: method,
        url: apiUrl,
        data: formData, // No file upload for categories
        headers: { Authorization: `Bearer ${token}` }
      });

      // Refresh categories list
      const response = await axios.get('http://localhost:8000/api/categories');
      setCategories(response.data.data || []);

      // Update stats
      const categoriesResponse = await axios.get('http://localhost:8000/api/categories');
      setStats(prevStats => ({
        ...prevStats,
        activeCategories: categoriesResponse.data.data?.length || 0,
      }));

      setShowCategoryForm(false);
      setEditingCategory(null);
      setFormData({ name: '', description: '' });
    } catch (err) {
      console.error('Error saving category:', err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError('You have no access to this operation');
      } else {
        setError('Failed to save category. Please try again.');
      }
    }
  };

  const handleCategoryDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8000/categories/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Refresh categories list
        const response = await axios.get('http://localhost:8000/api/categories');
        setCategories(response.data.data || []);

        // Update stats
        const categoriesResponse = await axios.get('http://localhost:8000/api/categories');
        setStats(prevStats => ({
          ...prevStats,
          activeCategories: categoriesResponse.data.data?.length || 0,
        }));

      } catch (err) {
        console.error('Error deleting category:', err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setError('You have no access to this operation');
        } else {
          setError('Failed to delete category. Please try again.');
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading {activeTab}...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <p>⚠️ {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      );
    }

    switch (activeTab) {
      case 'products':
        return (
          <div className="products-content">
            <div className="content-header">
              <h2>Products Management</h2>
              <button className="add-btn" onClick={() => {
                setShowProductForm(true);
                setEditingProduct(null);
                setFormData({ name: '', description: '', price: '', category: '', image: null });
              }}>+ Add New Product</button>
            </div>
            {showProductForm && (
              <form onSubmit={handleProductSubmit} className="product-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Image</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                    accept="image/*"
                    required={!editingProduct}
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setShowProductForm(false);
                      setEditingProduct(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
            <div className="products-grid">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-meta">
                      <span className="price">${product.price}</span>
                      <span className="category">{categories.find(cat => cat.id === product.category)?.name || 'Unknown Category'}</span>
                    </div>
                    <div className="product-actions">
                      <button
                        className="edit-btn"
                        onClick={() => {
                          setEditingProduct(product);
                          setFormData({
                            name: product.name,
                            description: product.description,
                            price: product.price,
                            category: product.category_id,
                            image: null
                          });
                          setShowProductForm(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleProductDelete(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'categories':
        return (
          <div className="categories-content">
            <div className="content-header">
              <h2>Categories Management</h2>
              <button className="add-btn" onClick={() => {
                setShowCategoryForm(true);
                setEditingCategory(null);
                setFormData({ name: '', description: '' });
              }}>+ Add New Category</button>
            </div>
            {showCategoryForm && (
              <form onSubmit={handleCategorySubmit} className="category-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    {editingCategory ? 'Update Category' : 'Add Category'}
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setShowCategoryForm(false);
                      setEditingCategory(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
            <div className="categories-list">
              {categories.map(category => (
                <div key={category.id} className="category-item">
                  <div className="category-info">
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                  </div>
                  <div className="category-actions">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingCategory(category);
                        setFormData({
                          name: category.name,
                          description: category.description
                        });
                        setShowCategoryForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleCategoryDelete(category.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="orders-content">
            <div className="content-header">
              <h2>Orders Management</h2>
              <div className="order-filters">
                <select className="filter-select">
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="6" className="no-data">No orders available</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="analytics-content">
            <div className="content-header">
              <h2>Analytics Dashboard</h2>
              <div className="date-range">
                <select className="range-select">
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>
            <div className="analytics-grid">
              <div className="chart-card">
                <h3>📈 Sales Overview</h3>
                <div className="chart-placeholder">
                  <p>Sales chart will be displayed here</p>
                </div>
              </div>
              <div className="chart-card">
                <h3>🍽️ Popular Items</h3>
                <div className="chart-placeholder">
                  <p>Popular items chart will be displayed here</p>
                </div>
              </div>
              <div className="chart-card">
                <h3>👥 Customer Insights</h3>
                <div className="chart-placeholder">
                  <p>Customer insights will be displayed here</p>
                </div>
              </div>
              <div className="chart-card">
                <h3>⏰ Peak Hours</h3>
                <div className="chart-placeholder">
                  <p>Peak hours chart will be displayed here</p>
                </div>
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
            <p>Welcome back, {JSON.parse(localStorage.getItem('username') || '""')}</p>
          </div>
          <div className="header-right">
            <div className="admin-profile">
              <span className="admin-avatar">👤</span>
              <span className="admin-name">{JSON.parse(localStorage.getItem('username') || '""')}</span>
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
          <div className="stat-card">
            <div className="stat-icon">🍽️</div>
            <div className="stat-info">
              <h3>Total Products</h3>
              <p>{statsLoading ? '...' : stats.totalProducts}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📂</div>
            <div className="stat-info">
              <h3>Categories</h3>
              <p>{statsLoading ? '...' : stats.activeCategories}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <h3>Orders Today</h3>
              <p>{statsLoading ? '...' : stats.ordersToday}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>Revenue Today</h3>
              <p>{statsLoading ? '...' : stats.revenueToday}</p>
            </div>
          </div>
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
