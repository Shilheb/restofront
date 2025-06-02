import React, { useContext, useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext.jsx';

const Navbar = ({ setShowLogin, isLoggedIn, setIsLoggedIn }) => {
  const [menu, setMenu] = useState("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Load dark mode preference
    const darkModePreference = localStorage.getItem('darkMode');
    setDarkMode(darkModePreference === 'true');
  }, [setIsLoggedIn]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenu && !event.target.closest('.navbar-container')) {
        setMobileMenu(false);
      }
      if (isUserMenuOpen && userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenu, isUserMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileMenu(false);
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success') {
          setIsLoggedIn(false);
          localStorage.clear();
          setIsUserMenuOpen(false);
          navigate('/');
        }
      } else {
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', !darkMode);
  };

  const cartItemCount = getTotalCartAmount();

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img src={assets.logo} alt="Resto Logo" className="logo-img" />
          <span className="logo-text">Resto</span>
        </Link>

        <div className={`nav-links ${mobileMenu ? 'active' : ''}`}>
          <Link 
            to="/" 
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
          <Link 
            to="/menu" 
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </Link>
          <Link 
            to="/about" 
            onClick={() => setMenu("about")}
            className={menu === "about" ? "active" : ""}
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            onClick={() => setMenu("contact")}
            className={menu === "contact" ? "active" : ""}
          >
            Contact
          </Link>
        </div>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <Link to="/cart" className="cart-icon">
            🛒
            <span className="cart-count">{cartItemCount > 0 ? (cartItemCount > 9 ? '9+' : cartItemCount) : ''}</span>
          </Link>
          
          {isLoggedIn ? (
            <div className="user-menu" ref={userMenuRef}>
              <button 
                className="user-menu-btn"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <span className="user-avatar">👤</span>
              </button>
              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <Link to="/profile" onClick={() => setIsUserMenuOpen(false)}>
                    Profile
                  </Link>
                  <Link to="/orders" onClick={() => setIsUserMenuOpen(false)}>
                    My Orders
                  </Link>
                  <button onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              className="login-btn"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          )}
          
          <button 
            className={`mobile-menu-btn ${mobileMenu ? 'active' : ''}`}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
