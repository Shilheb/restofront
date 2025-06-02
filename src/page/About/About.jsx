import React from 'react';
import './About.css';
import { assets } from '../../assets/assets';

const About = () => {
  const teamMembers = [
    {
      name: "Marco Rodriguez",
      role: "Head Chef",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=684&q=80",
      description: "With 15 years of culinary experience, Marco brings authentic flavors and innovative techniques to every dish."
    },
    {
      name: "Sarah Johnson",
      role: "Pastry Chef",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      description: "Sarah's creative desserts and artisanal breads have earned recognition from food critics nationwide."
    },
    {
      name: "David Chen",
      role: "Restaurant Manager",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      description: "David ensures every guest receives exceptional service and an unforgettable dining experience."
    },
    {
      name: "Elena Rossi",
      role: "Sous Chef",
      image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      description: "Elena specializes in Mediterranean cuisine and brings fresh, seasonal ingredients to our menu."
    }
  ];

  const values = [
    {
      icon: "🌱",
      title: "Fresh Ingredients",
      description: "We source the finest local and organic ingredients to ensure every dish is fresh and flavorful."
    },
    {
      icon: "👨‍🍳",
      title: "Expert Craftsmanship",
      description: "Our skilled chefs combine traditional techniques with modern innovation to create exceptional cuisine."
    },
    {
      icon: "🤝",
      title: "Community Focus",
      description: "We're committed to supporting our local community and creating a welcoming space for all."
    },
    {
      icon: "🌍",
      title: "Sustainability",
      description: "Environmental responsibility guides our practices, from sourcing to waste reduction."
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>Our Story</h1>
          <p>Crafting exceptional dining experiences since 2010</p>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Restaurant Interior" />
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>A Passion for Culinary Excellence</h2>
              <p>
                Founded in 2010 by Chef Marco Rodriguez, our restaurant began as a dream to bring 
                authentic, farm-to-table dining to the heart of the city. What started as a small 
                family-owned establishment has grown into a beloved culinary destination, while 
                maintaining our commitment to quality, sustainability, and exceptional service.
              </p>
              <p>
                Every dish tells a story of carefully selected ingredients, time-honored techniques, 
                and innovative creativity. We believe that great food brings people together, 
                creating memories that last a lifetime.
              </p>
              <div className="story-stats">
                <div className="stat">
                  <span className="stat-number">13+</span>
                  <span className="stat-label">Years of Excellence</span>
                </div>
                <div className="stat">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
                <div className="stat">
                  <span className="stat-number">200+</span>
                  <span className="stat-label">Signature Dishes</span>
                </div>
              </div>
            </div>
            <div className="story-image">
              <img src="https://images.unsplash.com/photo-1581349485608-9469926a8e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80" alt="Chef in Kitchen" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <p className="team-intro">
            Our passionate team of culinary professionals is dedicated to creating 
            extraordinary dining experiences for every guest.
          </p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <span className="member-role">{member.role}</span>
                  <p>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              To create exceptional dining experiences that celebrate the art of cuisine, 
              foster community connections, and honor our commitment to sustainability and quality. 
              We strive to be more than just a restaurant – we aim to be a place where memories 
              are made, relationships are nurtured, and the joy of great food is shared.
            </p>
            <div className="mission-highlights">
              <div className="highlight">
                <h4>Quality First</h4>
                <p>Every ingredient is carefully selected for freshness and flavor</p>
              </div>
              <div className="highlight">
                <h4>Community Driven</h4>
                <p>Supporting local farmers and suppliers while serving our neighbors</p>
              </div>
              <div className="highlight">
                <h4>Innovation</h4>
                <p>Constantly evolving our menu with seasonal specialties and new creations</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
