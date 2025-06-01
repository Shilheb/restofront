import React, { useState, useEffect } from 'react'
import './Header.css'

const Header = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const slides = [
        {
            title: "Authentic Flavors",
            subtitle: "Delivered Fresh",
            description: "Experience the finest culinary delights crafted with premium ingredients and traditional recipes passed down through generations.",
            cta: "Explore Menu",
            accent: "🍽️"
        },
        {
            title: "Farm to Table",
            subtitle: "Fresh & Organic",
            description: "Sustainably sourced ingredients from local farms, prepared with love and served with passion for an unforgettable dining experience.",
            cta: "Order Now",
            accent: "🌱"
        },
        {
            title: "Gourmet Experience",
            subtitle: "At Your Doorstep",
            description: "Indulge in restaurant-quality meals delivered hot and fresh to your door. Every bite tells a story of culinary excellence.",
            cta: "Get Started",
            accent: "🚀"
        }
    ];

    useEffect(() => {
        setIsLoaded(true);
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const handleViewMenu = () => {
        const menuSection = document.getElementById('explore-menu');
        if (menuSection) {
            menuSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <div className='header'>
            {/* Animated background particles */}
            <div className="header-particles">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className={`particle particle-${i % 4}`}></div>
                ))}
            </div>

            {/* Main hero slider */}
            <div className="header-slider">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`header-slide ${index === currentSlide ? 'active' : ''} ${isLoaded ? 'loaded' : ''}`}
                    >
                        <div className="slide-content">
                            <div className="slide-accent">{slide.accent}</div>
                            <span className="slide-subtitle">{slide.subtitle}</span>
                            <h1 className="slide-title">{slide.title}</h1>
                            <p className="slide-description">{slide.description}</p>

                            <div className="slide-actions">
                                <button
                                    className="btn-primary"
                                    onClick={handleViewMenu}
                                >
                                    {slide.cta}
                                    <span className="btn-arrow">→</span>
                                </button>
                                <button className="btn-secondary">
                                    <span className="play-icon">▶</span>
                                    Watch Story
                                </button>
                            </div>

                            <div className="slide-stats">
                                <div className="stat-item">
                                    <span className="stat-number">1000+</span>
                                    <span className="stat-label">Happy Customers</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">50+</span>
                                    <span className="stat-label">Signature Dishes</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">4.9★</span>
                                    <span className="stat-label">Average Rating</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Slide navigation */}
            <div className="header-navigation">
                <div className="nav-dots">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            <span className="dot-progress"></span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator">
                <div className="scroll-text">Discover More</div>
                <div className="scroll-mouse">
                    <div className="scroll-wheel"></div>
                </div>
            </div>

            {/* Floating elements */}
            <div className="floating-elements">
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <div className="floating-shape shape-3"></div>
            </div>
        </div>
    )
}

export default Header