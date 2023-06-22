import { useState, useEffect } from 'react';
import { db } from '../../Firebase';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Crud = ({ menuId, onCloseCrudPopup, onDeleteMenu }) => {
  // State pour gérer l'image du menu
  const [imageMenu, setImageMenu] = useState("");
  // State pour gérer le titre du menu
  const [titreMenu, setTitreMenu] = useState("");
  // State pour gérer l'état de l'éditeur WYSIWYG
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  // State pour stocker les catégories disponibles
  const [categories, setCategories] = useState([]);
  // State pour stocker les catégories sélectionnées
  const [selectedCategories, setSelectedCategories] = useState([]);
  // State pour déterminer l'action en cours (Ajouter ou Modifier)
  const [action, setAction] = useState("Ajouter");
  
  //Nettoyage URL de l'objet lors du demontage du composant
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageMenu);
    };
  }, [imageMenu]);

  // Gestionnaire de changement d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileName = file.name;
    setImageMenu(fileName);
  };

  // Gestionnaire de changement de titre du menu
  const handleTitreMenu = (e) => {
    setTitreMenu(e.target.value);
  };

  // Gestionnaire de changement du contenu du menu (éditeur WYSIWYG)
  const handleContenueMenu = (editorState) => {
    setEditorState(editorState);
  };

  // Gestionnaire de changement de catégories sélectionnées
  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.options)
      .filter(option => option.selected)
      .map(option => option.value);
    setSelectedCategories(selectedOptions);
  };

  // Effet pour récupérer les catégories disponibles depuis la base de données
  useEffect(() => {
    onValue(ref(db, 'categorie'), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const categoriesArray = Object.values(data);
        setCategories(categoriesArray);
      }
    });
  }, []);

  // Gestionnaire de soumission du formulaire (Ajouter un menu)
  const handleSubmit = () => {
    const uuid = uid();

    // Récupérer le contenu de l'éditeur WYSIWYG
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const contenue = rawContentState.blocks[0].text;
  
    const data = {
      id: uuid,
      image: imageMenu || "",
      titre: titreMenu || "",
      contenue: contenue || "",
      categories: selectedCategories || []
    };

    // Enregistrer les données du menu dans la base de données
    set(ref(db, `menu/${uuid}`), data);

    // Réinitialiser les valeurs des champs et des états après la soumission
    setImageMenu("");
    setTitreMenu("");
    setEditorState(EditorState.createEmpty());
    setSelectedCategories([]);
  };

  // Gestionnaire de mise à jour du menu
  const handleUpdate = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const contenue = rawContentState.blocks[0].text;

    // Mettre à jour les données du menu dans la base de données
    update(ref(db, `menu/${menuId}`), {
      image: imageMenu,
      titre: titreMenu,
      contenue: contenue,
      categories: selectedCategories
    });

    // Réinitialiser les valeurs des champs et des états après la mise à jour
    setImageMenu("");
    setTitreMenu("");
    setEditorState(EditorState.createEmpty());
    setSelectedCategories([]);
    setAction("Ajouter");
  };

  // Gestionnaire de suppression du menu
  const handleDelete = () => {
    // Supprimer le menu de la base de données
    remove(ref(db, `menu/${menuId}`))
      .then(() => {
        // Appeler la fonction onDeleteMenu pour informer le parent de la suppression
        onDeleteMenu(menuId);
        // Appeler la fonction onCloseCrudPopup pour fermer le pop-up Crud après la suppression
        onCloseCrudPopup();
      })
      .catch((error) => {
        console.log("Une erreur s'est produite lors de la suppression du menu :", error);
      });
  };

  // Gestionnaire de changement d'action (Ajouter ou Modifier)
  const handleActionChange = (selectedAction) => {
    setAction(selectedAction);
    if (selectedAction === "Ajouter") {
      // Réinitialiser les valeurs des champs et des états lorsque l'action est "Ajouter"
      setImageMenu("");
      setTitreMenu("");
      setEditorState(EditorState.createEmpty());
      setSelectedCategories([]);
    }
  };

  return (
    <>
      {/* Sélecteur d'action (Ajouter ou Modifier) */}
      <select value={action} onChange={(e) => handleActionChange(e.target.value)}>
        <option value="Ajouter">Ajouter</option>
        <option value="Modifier">Modifier</option>
      </select>

      {/* Formulaire pour ajouter un menu */}
      {action === "Ajouter" && (
        <section>
          <input type="file" accept="image/png, image/jpeg" name="image" value={imageMenu} onChange={handleImageChange} />
          <input type="text" name="titre" value={titreMenu} onChange={handleTitreMenu} />
          <Editor editorState={editorState} onEditorStateChange={handleContenueMenu} />
          <select multiple value={selectedCategories} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.titre}</option>
            ))}
          </select>
          <button onClick={handleSubmit}>Ajouter</button>
        </section>
      )}

      {/* Formulaire pour modifier un menu */}
      {action === "Modifier" && (
        <section>
          <input type="file" accept="image/png, image/jpeg" name="image" value={imageMenu} onChange={handleImageChange} />
          <input type="text" name="titre" value={titreMenu} onChange={handleTitreMenu} />
          <Editor editorState={editorState} onEditorStateChange={handleContenueMenu} />
          <select multiple value={selectedCategories} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.titre}</option>
            ))}
          </select>
          <button onClick={handleUpdate}>Modifier</button>
          <button onClick={handleDelete}>Supprimer</button>
        </section>
      )}

      {/* Bouton pour fermer le pop-up Crud */}
      <button onClick={onCloseCrudPopup}>Fermer</button>
    </>
  );
};

export default Crud;

