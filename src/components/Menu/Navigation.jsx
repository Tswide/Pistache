import React from 'react'
import Plat from '../../assets/Rectangle 2.jpg'
import './navigation.css'

const Navigation = () => {
  const category_name = ['Entree', 'Plats Froid', 'Plats chaud', 'Dessert'];

  return (
    <nav id='navigations__category'>
      {category_name.map((name, index) => (
        <div className='groupe__plats_navigation' key={index}>
          <img className='img__plats_navigation' src={Plat} alt="Category Plats froid" />
          <h2 className='category__plats_navigation'>{name}</h2>
        </div>
      ))}
    </nav>
  )
}

export default Navigation
