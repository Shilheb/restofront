import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import './Menu.css';

const Menu = () => {
  const { addToCart } = useContext(StoreContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const categories = [
    { id: 'all', name: 'All Items', icon: '🍽️' },
    { id: 'appetizers', name: 'Appetizers', icon: '🥗' },
    { id: 'mains', name: 'Main Courses', icon: '🍖' },
    { id: 'pasta', name: 'Pasta & Risotto', icon: '🍝' },
    { id: 'seafood', name: 'Seafood', icon: '🐟' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
    { id: 'beverages', name: 'Beverages', icon: '🥤' }
  ];

  const menuItems = [
    // Appetizers
    {
      id: 1,
      name: "Truffle Arancini",
      category: "appetizers",
      price: 16,
      description: "Crispy risotto balls filled with truffle and parmesan, served with garlic aioli",
      image: "/api/placeholder/300/200",
      popular: true,
      vegetarian: true
    },
    {
      id: 2,
      name: "Burrata Caprese",
      category: "appetizers",
      price: 18,
      description: "Fresh burrata cheese with heirloom tomatoes, basil, and aged balsamic",
      image: "/api/placeholder/300/200",
      vegetarian: true
    },
    {
      id: 3,
      name: "Tuna Tartare",
      category: "appetizers",
      price: 22,
      description: "Fresh yellowfin tuna with avocado, citrus, and sesame oil",
      image: "/api/placeholder/300/200",
      spicy: true
    },
    
    // Main Courses
    {
      id: 4,
      name: "Wagyu Beef Tenderloin",
      category: "mains",
      price: 65,
      description: "8oz premium wagyu with roasted vegetables and red wine reduction",
      image: "/api/placeholder/300/200",
      popular: true
    },
    {
      id: 5,
      name: "Herb-Crusted Lamb Rack",
      category: "mains",
      price: 48,
      description: "New Zealand lamb with rosemary crust, garlic mashed potatoes",
      image: "/api/placeholder/300/200"
    },
    {
      id: 6,
      name: "Duck Confit",
      category: "mains",
      price: 42,
      description: "Slow-cooked duck leg with cherry gastrique and wild rice",
      image: "/api/placeholder/300/200"
    },

    // Pasta & Risotto
    {
      id: 7,
      name: "Lobster Ravioli",
      category: "pasta",
      price: 38,
      description: "House-made ravioli filled with Maine lobster in saffron cream sauce",
      image: "/api/placeholder/300/200",
      popular: true
    },
    {
      id: 8,
      name: "Truffle Mushroom Risotto",
      category: "pasta",
      price: 32,
      description: "Creamy arborio rice with wild mushrooms and black truffle",
      image: "/api/placeholder/300/200",
      vegetarian: true
    },
    {
      id: 9,
      name: "Carbonara Classica",
      category: "pasta",
      price: 28,
      description: "Traditional Roman pasta with pancetta, eggs, and pecorino romano",
      image: "/api/placeholder/300/200"
    },

    // Seafood
    {
      id: 10,
      name: "Pan-Seared Halibut",
      category: "seafood",
      price: 44,
      description: "Fresh Pacific halibut with lemon butter and seasonal vegetables",
      image: "/api/placeholder/300/200"
    },
    {
      id: 11,
      name: "Grilled Branzino",
      category: "seafood",
      price: 36,
      description: "Whole Mediterranean sea bass with herbs and olive oil",
      image: "/api/placeholder/300/200"
    },
    {
      id: 12,
      name: "Seafood Paella",
      category: "seafood",
      price: 52,
      description: "Traditional Spanish rice with lobster, mussels, and saffron",
      image: "/api/placeholder/300/200",
      popular: true
    },

    // Desserts
    {
      id: 13,
      name: "Chocolate Lava Cake",
      category: "desserts",
      price: 14,
      description: "Warm chocolate cake with molten center and vanilla ice cream",
      image: "/api/placeholder/300/200",
      popular: true
    },
    {
      id: 14,
      name: "Tiramisu",
      category: "desserts",
      price: 12,
      description: "Classic Italian dessert with espresso-soaked ladyfingers",
      image: "/api/placeholder/300/200"
    },
    {
      id: 15,
      name: "Crème Brûlée",
      category: "desserts",
      price: 13,
      description: "Vanilla custard with caramelized sugar and fresh berries",
      image: "/api/placeholder/300/200"
    },

    // Beverages
    {
      id: 16,
      name: "Craft Cocktails",
      category: "beverages",
      price: 15,
      description: "House-crafted cocktails with premium spirits and fresh ingredients",
      image: "/api/placeholder/300/200"
    },
    {
      id: 17,
      name: "Wine Selection",
      category: "beverages",
      price: 12,
      description: "Curated selection of international wines by the glass",
      image: "/api/placeholder/300/200"
    },
    {
      id: 18,
      name: "Artisan Coffee",
      category: "beverages",
      price: 6,
      description: "Single-origin coffee beans roasted to perfection",
      image: "/api/placeholder/300/200"
    }
  ];

  useEffect(() => {
    let filtered = menuItems;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="menu-page">
      {/* Hero Section */}
      <section className="menu-hero">
        <div className="hero-content">
          <h1>Our Menu</h1>
          <p>Discover our carefully crafted dishes made with the finest ingredients</p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="menu-controls">
        <div className="container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search dishes..."
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
        </div>
      </section>

      {/* Menu Items Grid */}
      <section className="menu-items">
        <div className="container">
          <div className="items-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="menu-item-card">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                  <div className="item-badges">
                    {item.popular && <span className="badge popular">Popular</span>}
                    {item.vegetarian && <span className="badge vegetarian">Vegetarian</span>}
                    {item.spicy && <span className="badge spicy">Spicy</span>}
                  </div>
                </div>
                <div className="item-content">
                  <div className="item-header">
                    <h3 className="item-name">{item.name}</h3>
                    <span className="item-price">${item.price}</span>
                  </div>
                  <p className="item-description">{item.description}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(item.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="no-results">
              <h3>No items found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Menu;
