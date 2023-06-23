import { useState, useEffect } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Crud = ({ menuId, onCloseCrudPopup, onDeleteMenu }) => {
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

  useEffect(() => {
    // Code pour récupérer les données du menu à modifier en fonction de son ID avec PHP
 
    // Mettre à jour les valeurs des champs et des états avec les données du menu récupérées
    setTitreMenu("Titre du menu");
    setEditorState(EditorState.createWithContent(convertToRaw(EditorState.createEmpty().getCurrentContent())));
    setSelectedCategories([]);
    setAction("Modifier");

    // Code pour récupérer les catégories disponibles avec PHP

    // Mettre à jour les catégories disponibles
    setCategories(["Catégorie 1", "Catégorie 2", "Catégorie 3"]);
  }, [menuId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Gérer le changement d'image ici en fonction du fichier sélectionné
    console.log("Changer l'image du menu :", file);
  };

  const handleTitreChange = (e) => {
    const value = e.target.value;
    setTitreMenu(value);
  };

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    // Gérer la sélection de catégorie ici en fonction de la valeur sélectionnée
    console.log("Sélectionner la catégorie :", value);
  };

  const handleSaveMenu = () => {
    // Gérer l'enregistrement du menu ici avec les valeurs des champs et des états
    console.log("Enregistrer le menu :", {
      titre: titreMenu,
      contenu: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      categories: selectedCategories
    });
  };

  const handleDeleteMenu = () => {
    // Gérer la suppression du menu ici en utilisant l'ID du menu
    onDeleteMenu(menuId);
  };

  return (
    <div className="crud-popup">
      <div className="crud-popup-content">
        <h2>{action === 'Ajouter' ? 'Ajouter un menu' : 'Modifier un menu'}</h2>
        <div>
          <label>Image du menu :</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <div>
          <label>Titre du menu :</label>
          <input type="text" value={titreMenu} onChange={handleTitreChange} />
        </div>
        <div>
          <label>Contenu du menu :</label>
          <Editor editorState={editorState} onEditorStateChange={handleEditorChange} />
        </div>
        <div>
          <label>Catégorie :</label>
          <select value={selectedCategories} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="crud-popup-buttons">
          <button onClick={handleSaveMenu}>{action === 'Ajouter' ? 'Ajouter' : 'Modifier'}</button>
          {action === 'Modifier' && <button onClick={handleDeleteMenu}>Supprimer</button>}
          <button onClick={onCloseCrudPopup}>Fermer</button>
        </div>
      </div>
    </div>
  );
};

export default Crud;

