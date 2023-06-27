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

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString(); // Format de la date
    const formattedTime = date.toLocaleTimeString(); // Format de l'heure
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <>
      {isEmpty ? (
        <button onClick={onOpenCrudPopup}>Ajouter du contenu</button>
      ) : (
        menus.map((menu) => (
          <div key={menu.id} onClick={() => handleMenuClick(menu.id)}>
            <h1>{menu.titre}</h1>
            <p>{formatTimestamp(menu.timestamp)}</p> {/* Affiche le timestamp formaté */}
          </div>
        ))
      )}
    </>
  );
};

export default Liste;
