import { ref, onValue } from 'firebase/database';
import { db } from '../../Firebase';
import { useState, useEffect } from 'react';

const Liste = ({ handleEdit }) => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    onValue(ref(db, 'menu'), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const menusArray = Object.values(data);
        setMenus(menusArray);
      }
    });
  }, []);

  return (
    <>
      {menus.map((menu) => (
        <div key={menu.id} onClick={() => handleEdit(menu)}>
          <h1>{menu.titre}</h1>
          <p>{menu.contenue}</p>
        </div>
      ))}
    </>
  );
};

export default Liste;

