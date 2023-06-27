import { useState, useEffect } from 'react';
import Decoration_nom from '../../assets/Vector 4.svg';
import ImagePlat from '../../assets/Rectangle 2.jpg';
import { db } from '../../Firebase';
import { ref, onValue, query } from 'firebase/database';
import './card.css';

const Card = ({ selectedCategory }) => {
  const [menus, setMenus] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    // Effectue une requête à la base de données pour récupérer les menus
    onValue(
      query(ref(db, 'menu')),
      (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          const menusArray = Object.values(data);
          setMenus(menusArray);
        } else {
          setIsEmpty(true);
        }
      }
    );
  }, []);

  const filteredMenus = selectedCategory
    ? menus.filter((menu) => menu.categories.includes(selectedCategory))
    : menus;

  return (
    <section id='card'>
      {/* Boucle sur les menus filtrés pour les afficher */}
      {filteredMenus.map((menu, index) => (
        <article key={menu.id} className='card__flip'>
          <section className='card__plat'>
            <hgroup className='card__front'>
              <img className='img__card' src={ImagePlat} alt='Plats' />
            </hgroup>
            <hgroup className='card__back'>
              <div id='groupe__decoration_titre'>
                <h2 id='titre__plat_back'>{menu.titre}</h2>
                <img
                  id='deco__titre_back'
                  src={Decoration_nom}
                  alt='decoration sur le nom du plat'
                />
              </div>
              <p id='description__plat_back'>{menu.contenue}</p>
              <p id='prix__plat_back'>{menu.prix}€</p>
            </hgroup>
          </section>
        </article>
      ))}
    </section>
  );
};

export default Card;
