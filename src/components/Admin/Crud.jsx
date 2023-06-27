
import { useState, useEffect } from 'react';
import { db } from '../../Firebase';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Crud = ({ menuId, onCloseCrudPopup, onDeleteMenu }) => {
  const [imageMenu, setImageMenu] = useState("");
  const [titreMenu, setTitreMenu] = useState("");
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [prix, setPrix] = useState("");
  const [action, setAction] = useState("Ajouter");

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageMenu);
    };
  }, [imageMenu]);

  // Gestion du changement d'image du menu
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileName = file.name;
    setImageMenu(fileName);
  };

  // Gestion du changement de titre du menu
  const handleTitreMenu = (e) => {
    setTitreMenu(e.target.value);
  };

  // Gestion du changement du contenu du menu
  const handleContenueMenu = (editorState) => {
    setEditorState(editorState);
  };

  // Gestion du changement des catégories sélectionnées
  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.options)
      .filter(option => option.selected)
      .map(option => option.value);
    setSelectedCategories(selectedOptions);
  };

  useEffect(() => {
    // Récupération des catégories depuis la base de données
    onValue(ref(db, 'categorie'), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const categoriesArray = Object.values(data);
        setCategories(categoriesArray);
      }
    });
  }, []);

  // Soumission du formulaire d'ajout de menu
  const handleSubmit = () => {
    const uuid = uid();
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const contenue = rawContentState.blocks[0].text;

    const data = {
      id: uuid,
      image: imageMenu || "",
      titre: titreMenu || "",
      contenue: contenue || "",
      categories: selectedCategories || [],
      prix: prix || 0
    };

    // Ajout du menu à la base de données
    set(ref(db, `menu/${uuid}`), data);

    // Réinitialisation des champs du formulaire
    setImageMenu("");
    setTitreMenu("");
    setEditorState(EditorState.createEmpty());
    setSelectedCategories([]);
    setPrix("");
  };

  // Mise à jour du menu existant
  const handleUpdate = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const contenue = rawContentState.blocks[0].text;

    // Mise à jour des données du menu dans la base de données
    update(ref(db, `menu/${menuId}`), {
      image: imageMenu,
      titre: titreMenu,
      contenue: contenue,
      categories: selectedCategories,
      prix: prix
    });

    // Réinitialisation des champs du formulaire
    setImageMenu("");
    setTitreMenu("");
    setEditorState(EditorState.createEmpty());
    setSelectedCategories([]);
    setPrix("");
    setAction("Ajouter");
  };

  // Suppression du menu
  const handleDelete = () => {
    remove(ref(db, `menu/${menuId}`))
      .then(() => {
        onDeleteMenu(menuId);
        onCloseCrudPopup();
      })
      .catch((error) => {
        console.log("Une erreur s'est produite lors de la suppression du menu :", error);
      });
  };

  // Gestion du changement de l'action (Ajouter/Modifier)
  const handleActionChange = (selectedAction) => {
    setAction(selectedAction);
    if (selectedAction === "Ajouter") {
      // Réinitialisation des champs du formulaire si l'action est "Ajouter"
      setImageMenu("");
      setTitreMenu("");
      setEditorState(EditorState.createEmpty());
      setSelectedCategories([]);
      setPrix("");
    }
  };

  return (
    <>
      <select value={action} onChange={(e) => handleActionChange(e.target.value)}>
        <option value="Ajouter">Ajouter</option>
        <option value="Modifier">Modifier</option>
      </select>

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
          <input type="number" name="prix" value={prix} onChange={(e) => setPrix(e.target.value)} />
          <button onClick={handleSubmit}>Ajouter</button>
        </section>
      )}

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
          <input type="number" name="prix" value={prix} onChange={(e) => setPrix(e.target.value)} />
          <button onClick={handleUpdate}>Modifier</button>
          <button onClick={handleDelete}>Supprimer</button>
        </section>
      )}

      <button onClick={onCloseCrudPopup}>Fermer</button>
    </>
  );
};

export default Crud;

