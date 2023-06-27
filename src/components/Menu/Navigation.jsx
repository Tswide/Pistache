import { useEffect, useState } from 'react';
import Plat from '../../assets/Rectangle 2.jpg';
import { db } from '../../Firebase';
import { ref, onValue, query } from 'firebase/database';
import './navigation.css';

const Navigation = ({ onCategorySelect, selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    // Effectue une requête à la base de données pour récupérer les catégories
    onValue(
      query(ref(db, 'categorie')),
      (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          const categoryArray = Object.values(data);
          setCategories(categoryArray);
        } else {
          setIsEmpty(true);
        }
      }
    );
  }, []);

  return (
    <nav id='navigations__category'>
      {/* Section pour afficher tous les plats */}
      <section
        className={`groupe__plats_navigation ${selectedCategory === null ? 'active' : ''}`}
        onClick={() => onCategorySelect(null)}
      >
        <img
          className='img__plats_navigation'
          src={Plat}
          alt='Tous les plats'
        />
        <h2 className='category__plats_navigation'>Tous les plats</h2>
      </section>
      {/* Boucle sur les catégories pour les afficher */}
      {categories.map((category) => (
        <section
          className={`groupe__plats_navigation ${
            selectedCategory === category.id ? 'active' : ''
          }`}
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
        >
          <img
            className='img__plats_navigation'
            src={Plat}
            alt='Category Plats froid'
          />
          <h2 className='category__plats_navigation'>{category.titre}</h2>
        </section>
      ))}
    </nav>
  );
};

export default Navigation;


