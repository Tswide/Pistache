import { useState, useEffect } from 'react';

const Liste = ({ onOpenCrudPopup }) => {
  const [menus, setMenus] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    // Effectuer une requête PHP pour récupérer les menus depuis la base de données

    // Exemple de code PHP pour récupérer les menus depuis la base de données
    fetch('api/getMenus.php')
      .then(response => response.json())
      .then(data => {
        if (data !== null) {
          setMenus(data);
        } else {
          setIsEmpty(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleMenuClick = (menuId) => {
    onOpenCrudPopup(menuId);
  }

  return (
    <>
      {isEmpty ? (
        <button onClick={onOpenCrudPopup}>Ajouter du contenu</button>
      ) : (
        menus.map((menu) => (
          <div key={menu.id} onClick={() => handleMenuClick(menu.id)}>
            <h1>{menu.titre}</h1>
            <p>{menu.contenu}</p>
          </div>
        ))
      )}
    </>
  );
};

export default Liste;
