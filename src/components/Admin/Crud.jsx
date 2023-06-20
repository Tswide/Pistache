import { useState, useEffect } from 'react';
import { db } from '../../Firebase';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const Crud = ({ menuId, onCloseCrudPopup, onDeleteMenu }) => {
  const [imageMenu, setImageMenu] = useState("");
  const [titreMenu, setTitreMenu] = useState("");
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [menus, setMenus] = useState([]);
  const [action, setAction] = useState("Ajouter");

  const handleImageChange = (e) => {
    setImageMenu(e.target.value);
  }

  const handleTitreMenu = (e) => {
    setTitreMenu(e.target.value);
  }

  const handleContenueMenu = (editorState) => {
    setEditorState(editorState);
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.options)
      .filter(option => option.selected)
      .map(option => option.value);
    setSelectedCategories(selectedOptions);
  }

  useEffect(() => {
    onValue(ref(db, 'categorie'), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const categoriesArray = Object.values(data);
        setCategories(categoriesArray);
      }
    });
  }, []);

  const handleSubmit = () => {
    const uuid = uid();

    // Récupérer le contenu de l'éditeur WYSIWYG
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const contenue = rawContentState.blocks[0].text;
  
    const data = {
      id: uuid,
      image: imageMenu || "", // Vérifie si imageMenu est undefined et utilise une chaîne vide à la place
      titre: titreMenu || "", // Vérifie si titreMenu est undefined et utilise une chaîne vide à la place
      contenue: contenue || "", // Vérifie si contenueMenu est undefined et utilise une chaîne vide à la place
      categories: selectedCategories || [] // Vérifie si selectedCategories est undefined et utilise un tableau vide à la place
    };

    set(ref(db, `menu/${uuid}`), data);

    setImageMenu("");
    setTitreMenu("");
    setEditorState(EditorState.createEmpty());
    setSelectedCategories([]);
  };

  const handleUpdate = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const contenue = rawContentState.blocks[0].text;

    update(ref(db, `menu/${menuId}`), {
      image: imageMenu,
      titre: titreMenu,
      contenue: contenue,
      categories: selectedCategories
    });

    setImageMenu("");
    setTitreMenu("");
    setEditorState(EditorState.createEmpty());
    setSelectedCategories([]);
    setAction("Ajouter");
  }

  const handleDelete = () => {
    remove(ref(db, `menu/${menuId}`))
      .then(() => {
        onDeleteMenu(menuId);
        onCloseCrudPopup(); // Appel de la fonction onCloseCrudPopup pour fermer le pop-up Crud après la suppression
      })
      .catch((error) => {
        console.log("Une erreur s'est produite lors de la suppression du menu :", error);
      });
  }

  const handleActionChange = (selectedAction) => {
    setAction(selectedAction);
    if (selectedAction === "Ajouter") {
      setImageMenu("");
      setTitreMenu("");
      setContenueMenu("");
      setSelectedCategories([]);
    }
  }

  return (
    <>
      <select value={action} onChange={(e) => handleActionChange(e.target.value)}>
        <option value="Ajouter">Ajouter</option>
        <option value="Modifier">Modifier</option>
      </select>

      {action === "Ajouter" && (
        <>
          <input type="file" accept="image/png, image/jpeg" name="image" value={imageMenu} onChange={handleImageChange} />
          <input type="text" name="titre" value={titreMenu} onChange={handleTitreMenu} />
          <Editor editorState={editorState} onEditorStateChange={handleContenueMenu} />
          <select multiple value={selectedCategories} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.titre}</option>
            ))}
          </select>
          <button onClick={handleSubmit}>Ajouter</button>
        </>
      )}

      {action === "Modifier" && (
        <>
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
        </>
      )}

      <button onClick={onCloseCrudPopup}>Fermer</button>
    </>
  );
};

export default Crud;

