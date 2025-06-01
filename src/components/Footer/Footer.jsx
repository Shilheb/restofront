import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="Restaurant Logo" className="footer-logo" />
            <h2>Delicious Food Delivered</h2>
            <p>Experience the finest culinary delights delivered fresh to your doorstep. We're committed to providing exceptional food quality and outstanding service.</p>
            <div className="footer-social-icons">
                <a href="#" aria-label="Facebook">
                    <img src={assets.facebook_icon} alt="Facebook" />
                </a>
                <a href="#" aria-label="Twitter">
                    <img src={assets.twitter_icon} alt="Twitter" />
                </a>
                <a href="#" aria-label="LinkedIn">
                    <img src={assets.linkedin_icon} alt="LinkedIn" />
                </a>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Quick Links</h2>
            <ul>
                <li>Home</li>
                <li>Menu</li>
                <li>About Us</li>
                <li>Contact</li>
                <li>Delivery Info</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Contact Info</h2>
            <ul>
                <li>📞 +216 12 345 678</li>
                <li>✉️ contact@restaurant.tn</li>
                <li>📍 Tunis, Tunisia</li>
                <li>🕒 Mon-Sun: 9AM-11PM</li>
            </ul>
        </div>
      </div>
      <div className="footer-copyright">
          <p>Copyright 2024 © Restaurant App - All Rights Reserved. Made with ❤️ in Tunisia</p>
      </div>
    </div>
  )
}

export default Footer