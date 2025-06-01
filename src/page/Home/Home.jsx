import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import AppDownload from '../../components/AppDownload/Appdownload'
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <Header />

      {/* Introduction Section */}
      <section className="intro-section">
        <div className="container">
          <div className="intro-content">
            <h2>Welcome to Chef Restaurant</h2>
            <p className="intro-description">
              Experience culinary excellence where traditional recipes meet modern innovation.
              Our passionate chefs craft each dish with the finest ingredients, creating
              unforgettable dining experiences that celebrate authentic flavors from around the world.
            </p>

            <div className="intro-features">
              <div className="feature">
                <div className="feature-icon">👨‍🍳</div>
                <h3>Expert Chefs</h3>
                <p>Our world-class chefs bring decades of culinary expertise to every dish</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🌱</div>
                <h3>Fresh Ingredients</h3>
                <p>We source only the finest, locally-grown ingredients for maximum flavor</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🍽️</div>
                <h3>Authentic Recipes</h3>
                <p>Traditional recipes passed down through generations, perfected over time</p>
              </div>
            </div>

            <div className="cta-section">
              <Link to="/menu" className="cta-button primary">
                Explore Our Menu
              </Link>
              <Link to="/about" className="cta-button secondary">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Signature Dishes</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.9★</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Chef Restaurant?</h2>
            <p>Discover what makes us the premier dining destination</p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable delivery service to bring our delicious food right to your doorstep</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💎</div>
              <h3>Premium Quality</h3>
              <p>We never compromise on quality, using only the finest ingredients and preparation methods</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>Personalized Service</h3>
              <p>Tailored dining experiences that cater to your preferences and dietary requirements</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3>Great Value</h3>
              <p>Exceptional quality at competitive prices, making fine dining accessible to everyone</p>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <AppDownload />
    </div>
  )
}

export default Home