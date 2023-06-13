import { useState } from 'react'
import { db } from '../../Firebase';
import { uid } from 'uid';
import {set, ref} from 'firebase/database';

const Create = () => {
  //input formulaire
  const [imageMenu, setImageMenu] = useState("");
  const [titreMenu, setTitreMenu] = useState("");
  const [contenueMenu, setContenueMenu] = useState("");
    
  const handleImageChange = (e) => {
    setImageMenu(e.target.value);
  }

  const handleTitreMenu = (e) => {
    setTitreMenu(e.target.value);
  }

  const handleContenueMenu = (e) => {
    setContenueMenu(e.target.value);
  }

  //ecrire dans la db
  const writeMenuData = (id, image, titre, contenue) => {
    const menu = titreMenu;
    set(ref(db, `menu/${menu}`), {
      id: uid(),
      image: imageMenu,
      titre: titreMenu,
      contenue: contenueMenu,
    });

    setImageMenu("");
    setTitreMenu("");
    setContenueMenu("");
  }

  return (
    <>
        <input type="file" accept='image/png, image/jpeg' name="image" value={imageMenu} onChange={handleImageChange} />
        <input type="text" name="titre" value={titreMenu} onChange={handleTitreMenu} />
        <input type="text" name="contenue" value={contenueMenu} onChange={handleContenueMenu} />
        <button onClick={writeMenuData}>Envoyer</button>
    </>
  )
};

export default Create