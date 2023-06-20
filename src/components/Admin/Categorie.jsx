import { useState, useEffect } from 'react';
import { db } from '../../Firebase';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';

const Categorie = () => {
  // input formulaire
  const [titreCategorie, setTitreCategorie] = useState("");

  // liste des menus
  const [categories, setCategories] = useState([]);
  //changement du titre
  const [isEdit, setIsEdit] = useState(false);
  const [tempId, setTempId] = useState("");
  const [editedCategorie, setEditedCategorie] = useState(null);

  // evenement lors du changement d'etat sur les input
  const handleTitreChange = (e) => {
    setTitreCategorie(e.target.value);
  }

  // READ
  useEffect(() => {
    onValue(ref(db, 'categorie'), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const categorieArray = Object.values(data);
        setCategories(categorieArray);
      }
    });
  }, []);

  // CREATE
  const writeCategorieData = () => {
    const uuid = uid();

    set(ref(db, `categorie/${uuid}`), {
      id: uuid,
      titre: titreCategorie    
    });
    
    setTitreCategorie("")  
  }

  //UPDATE
  const handleUpdate = (categorie) => {
    setIsEdit(true);
    setTempId(categorie.id);
    setEditedCategorie(categorie);
    setTitreCategorie(categorie.titre);
  }

  const handleSubmitChange = () => {
    update(ref(db, `categorie/${tempId}`), {
      id: tempId,
      titre: titreCategorie,
    });

    setTitreCategorie("");
  }

  //DELETE
  const handleDelete = (categorie) => {
    remove(ref(db, `categorie/${categorie.id}`))
    .then(() => {
      // Mise à jour de l'état menus après la suppression
      const updatedCategories = categories.filter((c) => c.id !== categorie.id);
      setCategories(updatedCategories);
    })
    .catch((error) => {
      console.log("Une erreur s'est produite lors de la suppression du menu :", error);
    });
  }

  return (
    <>
      <input type="text" name="categorie" value={titreCategorie} onChange={handleTitreChange} />
      {
        isEdit
          ? (
            <>
              <button onClick={handleSubmitChange}>Changement</button>
              <button onClick={() => setIsEdit(false)}>X</button>
            </>
          )
          : (
            <button onClick={writeCategorieData}>Envoyer</button>
          )
      }
      {categories.map((categorie) => (
        <div key={categorie.id}>
        {
          editedCategorie === categorie 
            ? (
              <>
                <h1>{titreCategorie}</h1>
              </>
            )
            : (
              <>
                <h1>{categorie.titre}</h1>
              </>
          )} 
          <button onClick={() => handleUpdate(categorie)}>Mettre à jour</button>
          <button onClick={() => handleDelete(categorie)}>Supprimer</button>
        </div>
      ))}
    </>
  );
};

export default Categorie;
