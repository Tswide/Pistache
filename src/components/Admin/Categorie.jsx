import { useState, useEffect } from 'react';
import { db } from '../../Firebase';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';

const Crud = () => {
  // input formulaire
  const [imageMenu, setImageMenu] = useState("");
  const [titreMenu, setTitreMenu] = useState("");
  const [contenueMenu, setContenueMenu] = useState("");
  // liste des menus
  const [menus, setMenus] = useState([]);
  //changement du titre
  const [isEdit, setIsEdit] = useState(false);
  const [tempId, setTempId] = useState("");
  const [editedMenu, setEditedMenu] = useState(null);

  // evenement lors du changement d'etat sur les input
  const handleImageChange = (e) => {
    setImageMenu(e.target.value);
  }

  const handleTitreMenu = (e) => {
    setTitreMenu(e.target.value);
  }

  const handleContenueMenu = (e) => {
    setContenueMenu(e.target.value);
  }

  // READ
  useEffect(() => {
    onValue(ref(db, 'menu'), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const menusArray = Object.values(data);
        setMenus(menusArray);
      }
    });
  }, []);

  // CREATE
  const writeMenuData = () => {
    const uuid = uid();

    set(ref(db, `menu/${uuid}`), {
      id: uuid,
      image: imageMenu,
      titre: titreMenu,
      contenue: contenueMenu,
    });
    
    setImageMenu("");
    setTitreMenu(""); 
    setContenueMenu("");
  }

  //UPDATE
  const handleUpdate = (menu) => {
    setIsEdit(true);
    setTempId(menu.id);
    setEditedMenu(menu);
    setTitreMenu(menu.titre);
    setContenueMenu(menu.contenue);
  }

  const handleSubmitChange = () => {
    update(ref(db, `menu/${tempId}`), {
      id: tempId,
      titre: titreMenu,
      contenue: contenueMenu,
    });

    setTitreMenu("");
    setContenueMenu("");
    setIsEdit(false);
    setEditedMenu(null);
  }

  //DELETE
  const handleDelete = (menu) => {
    remove(ref(db, `menu/${menu.id}`))
    .then(() => {
      // Mise à jour de l'état menus après la suppression
      const updatedMenus = menus.filter((m) => m.id !== menu.id);
      setMenus(updatedMenus);
    })
    .catch((error) => {
      console.log("Une erreur s'est produite lors de la suppression du menu :", error);
    });
  }

  return (
    <>
      <input type="file" accept='image/png, image/jpeg' name="image" value={imageMenu} onChange={handleImageChange} />
      <input type="text" name="titre" value={titreMenu} onChange={handleTitreMenu} />
      <input type="text" name="contenue" value={contenueMenu} onChange={handleContenueMenu} />
      {
        isEdit
          ? (
            <>
              <button onClick={handleSubmitChange}>Changement</button>
              <button onClick={() => setIsEdit(false)}>X</button>
            </>
          )
          : (
            <button onClick={writeMenuData}>Envoyer</button>
          )
      }
      {menus.map((menu) => (
        <div key={menu.id}>
        {
          editedMenu === menu 
            ? (
              <>
                <h1>{titreMenu}</h1>
                <p>{contenueMenu}</p>
              </>
            )
            : (
              <>
                <h1>{menu.titre}</h1>
                <p>{menu.contenue}</p>
              </>
          )} 
          <button onClick={() => handleUpdate(menu)}>Mettre à jour</button>
          <button onClick={() => handleDelete(menu)}>Supprimer</button>
        </div>
      ))}
    </>
  );
};

export default Crud;
