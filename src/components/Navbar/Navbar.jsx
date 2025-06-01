import React, { useContext, useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext.jsx';

const Navbar = ({ setShowLogin, isLoggedIn, setIsLoggedIn }) => {
  const [menu, setMenu] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Load dark mode preference
    const darkModePreference = localStorage.getItem('darkMode');
    setIsDarkMode(darkModePreference === 'true');
  }, [setIsLoggedIn]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.navbar-container')) {
        setIsMobileMenuOpen(false);
      }
      if (isSearchOpen && searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (isUserMenuOpen && userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen, isSearchOpen, isUserMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://restolaravel-z59t.vercel.app/api/api/logout', {
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
          alert('Logout successful!');
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
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.body.classList.toggle('dark-mode', newDarkMode);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
    setIsMobileMenuOpen(false);
  };

  const cartItemCount = getTotalCartAmount();

  return (
    <div className={`navbar ${isScrolled ? 'scrolled' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="navbar-container">
        {/* Logo Section */}
        <Link to='/' onClick={() => handleMenuClick("home")} className="navbar-logo">
          <img className='logo' src={assets.logo1} alt="Chef Logo" />
          <span className="logo-text">Chef</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation Menu */}
        <nav className={`navbar-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link
            to="/"
            onClick={() => handleMenuClick("home")}
            className={`nav-link ${menu === "home" ? "active" : ""}`}
          >
            <span className="nav-text">Home</span>
            <div className="nav-indicator"></div>
          </Link>
          <Link
            to="/menu"
            onClick={() => handleMenuClick("menu")}
            className={`nav-link ${menu === "menu" ? "active" : ""}`}
          >
            <span className="nav-text">Menu</span>
            <div className="nav-indicator"></div>
          </Link>
          <Link
            to="/about"
            onClick={() => handleMenuClick("about")}
            className={`nav-link ${menu === "about" ? "active" : ""}`}
          >
            <span className="nav-text">About Us</span>
            <div className="nav-indicator"></div>
          </Link>
          <Link
            to="/contact"
            onClick={() => handleMenuClick("contact")}
            className={`nav-link ${menu === "contact" ? "active" : ""}`}
          >
            <span className="nav-text">Contact</span>
            <div className="nav-indicator"></div>
          </Link>
        </nav>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Search Section */}
          <div className="search-container" ref={searchRef}>
            <button
              className={`search-btn ${isSearchOpen ? 'active' : ''}`}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <img src={assets.search_icon} alt="Search" />
            </button>

            {isSearchOpen && (
              <div className="search-dropdown">
                <form onSubmit={handleSearch} className="search-form">
                  <input
                    type="text"
                    placeholder="Search for dishes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    autoFocus
                  />
                  <button type="submit" className="search-submit">
                    <img src={assets.search_icon} alt="Search" />
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {/* Cart */}
          <Link to='/cart' className='cart-btn' aria-label="Shopping Cart">
            <img src={assets.basket_icon} alt="Cart" />
            {cartItemCount > 0 && (
              <span className="cart-badge">
                {cartItemCount > 9 ? '9+' : cartItemCount}
              </span>
            )}
          </Link>

          {/* User Authentication */}
          {isLoggedIn ? (
            <div className="user-menu-container" ref={userMenuRef}>
              <button
                className="user-menu-btn"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-label="User menu"
              >
                <div className="user-avatar">
                  <span>👤</span>
                </div>
              </button>

              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <span className="user-name">Welcome!</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={() => navigate('/profile')}>
                    <span>👤</span> Profile
                  </button>
                  <button className="dropdown-item" onClick={() => navigate('/orders')}>
                    <span>📋</span> My Orders
                  </button>
                  <button className="dropdown-item" onClick={() => navigate('/favorites')}>
                    <span>❤️</span> Favorites
                  </button>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout-item" onClick={handleLogout}>
                    <span>🚪</span> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="auth-btn signin-btn" onClick={() => setShowLogin(true)}>
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
