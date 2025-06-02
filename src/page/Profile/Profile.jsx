import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Load user data from localStorage
    const userData = {
      name: localStorage.getItem('username') || '',
      email: localStorage.getItem('email') || '',
      phone: localStorage.getItem('phone') || '',
      address: localStorage.getItem('address') || ''
    };
    setUser(userData);
    setFormData(userData);

    // Check if user is logged in
    if (!localStorage.getItem('user_id')) {
      navigate('/');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Update localStorage
    localStorage.setItem('username', formData.name);
    localStorage.setItem('email', formData.email);
    localStorage.setItem('phone', formData.phone);
    localStorage.setItem('address', formData.address);
    
    setUser(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('phone');
    localStorage.removeItem('address');
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
          <h1>My Profile</h1>
          <p>Manage your account information</p>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              {!isEditing ? (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="save-btn" onClick={handleSave}>
                    Save
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="form-value">{user.name || 'Not provided'}</div>
                )}
              </div>

              <div className="form-group">
                <label>Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="form-value">{user.email || 'Not provided'}</div>
                )}
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <div className="form-value">{user.phone || 'Not provided'}</div>
                )}
              </div>

              <div className="form-group">
                <label>Address</label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    rows="3"
                  />
                ) : (
                  <div className="form-value">{user.address || 'Not provided'}</div>
                )}
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>Account Actions</h2>
            <div className="action-buttons">
              <button 
                className="action-btn orders-btn"
                onClick={() => navigate('/myorder')}
              >
                <span className="btn-icon">📦</span>
                View My Orders
              </button>
              
              <button 
                className="action-btn menu-btn"
                onClick={() => navigate('/menu')}
              >
                <span className="btn-icon">🍽️</span>
                Browse Menu
              </button>
              
              <button 
                className="action-btn logout-btn"
                onClick={handleLogout}
              >
                <span className="btn-icon">🚪</span>
                Logout
              </button>
            </div>
          </div>

          <div className="profile-section">
            <h2>Account Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🛒</div>
                <div className="stat-info">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Total Orders</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-info">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Reviews Given</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <div className="stat-number">0 DT</div>
                  <div className="stat-label">Total Spent</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
