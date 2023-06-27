import React, { useState } from 'react';
import Navigation from '../components/Menu/Navigation';
import Card from '../components/Menu/Card';

import '../css/menu.css';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <main id='menu'>
      <Navigation onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
      <Card selectedCategory={selectedCategory} />
    </main>
  );
};

export default Menu;

