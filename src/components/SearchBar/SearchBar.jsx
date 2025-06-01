import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import { assets } from '../../assets/assets';

const SearchBar = ({ onSearch, placeholder = "Search for delicious food..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearch(searchTerm);
    }, 300); // Debounce search

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, onSearch]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  return (
    <div className={`search-bar ${isActive ? 'active' : ''}`}>
      <div className="search-input-container">
        <img 
          src={assets.search_icon} 
          alt="Search" 
          className="search-icon"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="search-input"
        />
        {searchTerm && (
          <button 
            onClick={handleClear}
            className="clear-button"
            type="button"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
