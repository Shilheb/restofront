import React, { useState, useEffect } from 'react';
import './EwploreMenu.css';
import axios from 'axios';

const ExploreMenu = ({ category, setCategory }) => {
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load category from local storage on initial render
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
      setCategory(savedCategory);
    }

    const fetchMenu = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories');
        setMenuList(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const handleCategoryClick = (itemId) => {
    const newCategory = category === itemId.toString() ? "All" : itemId.toString();
    setCategory(newCategory);
    // Save to local storage
    localStorage.setItem('selectedCategory', newCategory);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>
      <div className="explore-menu-list">
        {menuList.map((item) => (
          <div
            onClick={() => handleCategoryClick(item.id)}
            key={item.id}
            className='explore-menu-list-item'
          >
            <img
              src={`data:image/jpeg;base64,${item.image}`}
              className={category === item.id.toString() ? "active" : ""}
              alt={item.description}
            />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;