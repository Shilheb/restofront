import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext.jsx';

const Navbar = ({ setShowLogin, isLoggedIn, setIsLoggedIn }) => {
  const [menu, setMenu] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalCartAmount } = useContext(StoreContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [setIsLoggedIn]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const cartItemCount = getTotalCartAmount();

  return (
    <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo Section */}
        <Link to='/' onClick={() => setMenu("home")} className="navbar-logo">
          <img className='logo' src={assets.logo1} alt="Chef Logo" />
          <span className="logo-text">Chef</span>
        </Link>

        {/* Navigation Menu */}
        <nav className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={`nav-link ${menu === "home" ? "active" : ""}`}
          >
            <span className="nav-text">Home</span>
            <div className="nav-indicator"></div>
          </Link>
          <Link
            to="/menu"
            onClick={() => setMenu("menu")}
            className={`nav-link ${menu === "menu" ? "active" : ""}`}
          >
            <span className="nav-text">Menu</span>
            <div className="nav-indicator"></div>
          </Link>
          <Link
            to="/about"
            onClick={() => setMenu("about")}
            className={`nav-link ${menu === "about" ? "active" : ""}`}
          >
            <span className="nav-text">About Us</span>
            <div className="nav-indicator"></div>
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenu("contact")}
            className={`nav-link ${menu === "contact" ? "active" : ""}`}
          >
            <span className="nav-text">Contact</span>
            <div className="nav-indicator"></div>
          </Link>
        </nav>

        {/* Right Section */}
        <div className="navbar-right">
          <button className="search-btn" aria-label="Search">
            <img src={assets.search_icon} alt="Search" />
          </button>

          <Link to='/cart' className='cart-btn' aria-label="Shopping Cart">
            <img src={assets.basket_icon} alt="Cart" />
            {cartItemCount > 0 && (
              <span className="cart-badge">
                {cartItemCount > 9 ? '9+' : cartItemCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <button className="auth-btn logout-btn" onClick={handleLogout}>
              <span>Logout</span>
            </button>
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
