import { useState, useEffect } from 'react';
import { db } from '../../Firebase';
import { set, ref, remove, update } from 'firebase/database';

const Crud = ({ selectedMenu, setSelectedMenu, handleCancelEdit }) => {
  const [imageMenu, setImageMenu] = useState("");
  const [titreMenu, setTitreMenu] = useState("");
  const [contenueMenu, setContenueMenu] = useState("");

  useEffect(() => {
    if (selectedMenu) {
      setImageMenu(selectedMenu.image);
      setTitreMenu(selectedMenu.titre);
      setContenueMenu(selectedMenu.contenue);
    }
  }, [selectedMenu]);

  const handleImageChange = (e) => {
    setImageMenu(e.target.value);
  }

  const handleTitreMenu = (e) => {
    setTitreMenu(e.target.value);
  }

  const handleContenueMenu = (e) => {
    setContenueMenu(e.target.value);
  }

  const handleCreate = () => {
    const newMenuRef = ref(db, 'menu').push();
    const newMenuKey = newMenuRef.key;

    set(ref(db, `menu/${newMenuKey}`), {
      id: newMenuKey,
      image: imageMenu,
      titre: titreMenu,
      contenue: contenueMenu,
    });

    setImageMenu("");
    setTitreMenu("");
    setContenueMenu("");
  }

  const handleUpdate = () => {
    update(ref(db, `menu/${selectedMenu.id}`), {
      image: imageMenu,
      titre: titreMenu,
      contenue: contenueMenu,
    });

    setSelectedMenu(null);
    handleCancelEdit();
  }

  const handleDelete = () => {
    remove(ref(db, `menu/${selectedMenu.id}`));

    setSelectedMenu(null);
    handleCancelEdit();
  }

  const handleCancel = () => {
    setSelectedMenu(null);
    handleCancelEdit();
  }

  return (
    <div>
      <input type="file" accept="image/png, image/jpeg" name="image" value={imageMenu} onChange={handleImageChange} />
      <input type="text" name="titre" value={titreMenu} onChange={handleTitreMenu} />
      <input type="text" name="contenue" value={contenueMenu} onChange={handleContenueMenu} />

      {selectedMenu ? (
        <>
          <button onClick={handleUpdate}>Modifier</button>
          <button onClick={handleDelete}>Supprimer</button>
          <button onClick={handleCancel}>Annuler</button>
        </>
      ) : (
        <button onClick={handleCreate}>Créer</button>
      )}
    </div>
  );
};

export default Crud;

