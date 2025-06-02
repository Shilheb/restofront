import React, { useState, useEffect, useMemo } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import axios from 'axios';

const FoodDisplay = ({ category = "All", categories = [], searchTerm = "" }) => {
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/articles'
        );
        //console.log(response.data.data); // Debug: Log API response
        setFoodList(response.data.data);
      } catch (err) {
        console.error('Error fetching food items:', err);
        setError('Failed to fetch food items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchFoodItems();
  }, []);

  const filteredFoodList = useMemo(() => {
    let filtered = foodList;

    // First, filter by category
    const savedCategory = localStorage.getItem('selectedCategory');
    const currentCategory = savedCategory || category;

    if (currentCategory !== "All" && savedCategory) {
      filtered = filtered.filter(item => item.categorie_id == savedCategory);
    }

    // Then, filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [foodList, category, categories, searchTerm]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="food-display-skeleton">
      <div className="food-display-skeleton-image"></div>
      <div className="food-display-skeleton-content">
        <div className="food-display-skeleton-title"></div>
        <div className="food-display-skeleton-desc"></div>
        <div className="food-display-skeleton-desc"></div>
        <div className="food-display-skeleton-price"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="food-display loading" id="food-display">
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
          {Array(6).fill(0).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="food-display" id="food-display">
        <div className="food-display-empty">
          <div className="food-display-empty-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (filteredFoodList.length === 0) {
    const isSearching = searchTerm.trim().length > 0;
    return (
      <div className="food-display" id="food-display">
        <h2>{isSearching ? `Search results for "${searchTerm}"` : "Top dishes near you"}</h2>
        <div className="food-display-empty">
          <div className="food-display-empty-icon">{isSearching ? '🔍' : '🍽️'}</div>
          <h3>{isSearching ? 'No results found' : 'No dishes found'}</h3>
          <p>
            {isSearching
              ? `No dishes match "${searchTerm}". Try a different search term.`
              : 'No items found in this category. Try selecting a different category or check back later.'
            }
          </p>
        </div>
      </div>
    );
  }

  const isSearching = searchTerm.trim().length > 0;

  return (
    <div className="food-display fade-in" id="food-display">
      <h2>
        {isSearching
          ? `Search results for "${searchTerm}" (${filteredFoodList.length} found)`
          : "Top dishes near you"
        }
      </h2>
      <div className="food-display-list">
        {filteredFoodList.map((item, index) => (
          <div
            key={item.id}
            className="fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <FoodItem
              image={item.image}
              name={item.name}
              desc={item.description}
              price={item.price}
              id={item.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;