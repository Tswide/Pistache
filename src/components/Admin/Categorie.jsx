import { useState, useEffect } from 'react';

const Categorie = () => {
  const [titreCategorie, setTitreCategorie] = useState("");
  const [categories, setCategories] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempId, setTempId] = useState("");
  const [editedCategorie, setEditedCategorie] = useState(null);

  const handleTitreChange = (e) => {
    setTitreCategorie(e.target.value);
  }

  useEffect(() => {
    // Effectuer une requête PHP pour récupérer les catégories depuis la base de données

    // Exemple de code PHP pour récupérer les catégories depuis la base de données
    fetch('api/getCategories.php')
      .then(response => response.json())
      .then(data => {
        if (data !== null) {
          setCategories(data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const writeCategorieData = () => {
    // Effectuer une requête PHP pour écrire les données de la catégorie dans la base de données

    // Exemple de code PHP pour écrire les données de la catégorie dans la base de données
    fetch('api/writeCategorie.php', {
      method: 'POST',
      body: JSON.stringify({
        titre: titreCategorie
      })
    })
      .then(response => response.json())
      .then(data => {
        // Mettre à jour les catégories après l'écriture des données
        setCategories([...categories, data]);
        setTitreCategorie("");
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleUpdate = (categorie) => {
    setIsEdit(true);
    setTempId(categorie.id);
    setEditedCategorie(categorie);
    setTitreCategorie(categorie.titre);
  }

  const handleSubmitChange = () => {
    // Effectuer une requête PHP pour mettre à jour les données de la catégorie dans la base de données

    // Exemple de code PHP pour mettre à jour les données de la catégorie dans la base de données
    fetch('api/updateCategorie.php', {
      method: 'POST',
      body: JSON.stringify({
        id: tempId,
        titre: titreCategorie
      })
    })
      .then(() => {
        // Mettre à jour les catégories après la modification des données
        const updatedCategories = categories.map((categorie) => {
          if (categorie.id === tempId) {
            return {
              ...categorie,
              titre: titreCategorie
            };
          }
          return categorie;
        });
        setCategories(updatedCategories);
        setTitreCategorie("");
        setIsEdit(false);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleDelete = (categorie) => {
    // Effectuer une requête PHP pour supprimer la catégorie de la base de données

    // Exemple de code PHP pour supprimer la catégorie de la base de données
    fetch('api/deleteCategorie.php', {
      method: 'POST',
      body: JSON.stringify({
        id: categorie.id
      })
    })
      .then(() => {
        // Mettre à jour les catégories après la suppression
        const updatedCategories = categories.filter((c) => c.id !== categorie.id);
        setCategories(updatedCategories);
      })
      .catch((error) => {
        console.log("Une erreur s'est produite lors de la suppression de la catégorie :", error);
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

