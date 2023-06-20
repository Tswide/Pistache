import { ref, onValue } from 'firebase/database';
import { db } from '../../Firebase';
import { useState, useEffect } from 'react';

const Liste = ({ onOpenCrudPopup }) => {
  const [menus, setMenus] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    onValue(ref(db, 'menu'), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const menusArray = Object.values(data);
        setMenus(menusArray);
      } else {
        setIsEmpty(true); // Définit isEmpty à true si la base de données menu est vide
      }
    });
  }, []);

  const handleMenuClick = (menuId) => {
    onOpenCrudPopup(menuId); // Appel de la fonction onOpenCrudPopup avec l'ID du menu cliqué
  }

  return (
    <>
      {isEmpty ? (
        <button onClick={onOpenCrudPopup}>Ajouter du contenu</button>
      ) : (
        menus.map((menu) => (
          <div key={menu.id} onClick={() => handleMenuClick(menu.id)}>
            <h1>{menu.titre}</h1>
            <p>{menu.contenue}</p>
          </div>
        ))
      )}
    </>
  );
};

export default Liste;

