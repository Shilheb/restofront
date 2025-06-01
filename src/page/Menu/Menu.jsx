import React, { useState, useEffect, useContext, useMemo } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Menu.css';

const Menu = () => {
  const { addToCart, cartItems } = useContext(StoreContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [foodList, setFoodList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Get search query from URL if navigated from navbar search
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [location]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch categories
        const categoriesResponse = await axios.get('https://restolaravel-z59t.vercel.app/api/api/categories');
        const categoriesData = [
          { id: 'all', name: 'All Items', icon: '🍽️' },
          ...categoriesResponse.data.data.map(cat => ({
            id: cat.id.toString(),
            name: cat.name,
            icon: getCategoryIcon(cat.name)
          }))
        ];
        setCategories(categoriesData);

        // Fetch food items
        const foodResponse = await axios.get('https://restolaravel-z59t.vercel.app/api/api/articles');
        setFoodList(foodResponse.data.data);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load menu data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to get category icons
  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      'Salad': '🥗',
      'Rolls': '🌯',
      'Deserts': '🍰',
      'Sandwich': '🥪',
      'Cake': '🎂',
      'Pure Veg': '🥬',
      'Pasta': '🍝',
      'Noodles': '🍜'
    };
    return iconMap[categoryName] || '🍽️';
  };

  // Filter food items based on category and search
  const filteredItems = useMemo(() => {
    let filtered = foodList;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.categorie_id.toString() === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [foodList, selectedCategory, searchTerm]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="menu-item-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-desc"></div>
        <div className="skeleton-desc short"></div>
        <div className="skeleton-price"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="menu-page">
        <section className="menu-hero">
          <div className="hero-content">
            <h1>Our Menu</h1>
            <p>Discover our carefully crafted dishes made with the finest ingredients</p>
          </div>
        </section>

        <section className="menu-controls">
          <div className="container">
            <div className="search-bar">
              <div className="skeleton-search"></div>
            </div>
            <div className="category-filters">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="skeleton-category"></div>
              ))}
            </div>
          </div>
        </section>

        <section className="menu-items">
          <div className="container">
            <div className="items-grid">
              {Array(8).fill(0).map((_, index) => (
                <LoadingSkeleton key={index} />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-page">
        <section className="menu-hero">
          <div className="hero-content">
            <h1>Our Menu</h1>
            <p>Discover our carefully crafted dishes made with the finest ingredients</p>
          </div>
        </section>

        <section className="menu-items">
          <div className="container">
            <div className="error-state">
              <div className="error-icon">⚠️</div>
              <h3>Oops! Something went wrong</h3>
              <p>{error}</p>
              <button
                className="retry-btn"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="menu-page">
      {/* Hero Section */}
      <section className="menu-hero">
        <div className="hero-content">
          <h1>Our Complete Menu</h1>
          <p>Discover our carefully crafted dishes made with the finest ingredients and traditional recipes</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{foodList.length}+</span>
              <span className="stat-label">Delicious Dishes</span>
            </div>
            <div className="stat">
              <span className="stat-number">{categories.length - 1}</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Fresh Ingredients</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="menu-controls">
        <div className="container">
          <div className="controls-header">
            <h2>Find Your Perfect Dish</h2>
            <p>Use the search and filters below to discover your next favorite meal</p>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for dishes, ingredients, or flavors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>

          <div className="results-info">
            <span className="results-count">
              {filteredItems.length} {filteredItems.length === 1 ? 'dish' : 'dishes'} found
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
            </span>
          </div>
        </div>
      </section>

      {/* Menu Items Grid */}
      <section className="menu-items">
        <div className="container">
          {filteredItems.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">
                {searchTerm ? '🔍' : '🍽️'}
              </div>
              <h3>{searchTerm ? 'No dishes found' : 'No items in this category'}</h3>
              <p>
                {searchTerm
                  ? `No dishes match "${searchTerm}". Try a different search term.`
                  : 'Try selecting a different category or check back later.'
                }
              </p>
              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  className="clear-filters-btn"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="items-grid">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="menu-item-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="item-image">
                    <img
                      src={item.image ? `data:image/png;base64,${item.image}` : '/api/placeholder/300/200'}
                      alt={item.name}
                      loading="lazy"
                    />
                    <div className="item-overlay">
                      <button
                        className={`quick-add-btn ${cartItems[item.id] ? 'added' : ''}`}
                        onClick={() => addToCart(item.id)}
                      >
                        {cartItems[item.id] ? '✓ Added' : '+ Add to Cart'}
                      </button>
                    </div>
                  </div>
                  <div className="item-content">
                    <div className="item-header">
                      <h3 className="item-name">{item.name}</h3>
                      <span className="item-price">${item.price}</span>
                    </div>
                    <p className="item-description">{item.description}</p>
                    <div className="item-actions">
                      {!cartItems[item.id] ? (
                        <button
                          className="add-to-cart-btn primary"
                          onClick={() => addToCart(item.id)}
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn minus"
                            onClick={() => addToCart(item.id)}
                          >
                            -
                          </button>
                          <span className="quantity">{cartItems[item.id]}</span>
                          <button
                            className="quantity-btn plus"
                            onClick={() => addToCart(item.id)}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Menu;
