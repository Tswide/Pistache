import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { auth } from '../Firebase';

import Navigation from '../components/Admin/Navigation';
import Categorie from '../components/Admin/Categorie';
import Liste from '../components/Admin/Liste';
import Crud from '../components/Admin/Crud';

const Administration = () => {
  const [authUser, setAuthUser] = useState(null);
  const [active, setActive] = useState('categorie');
  const [crudPopupOpen, setCrudPopupOpen] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, user => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(null)
      }
    });
  
    return() => {
      listen();
    }
  }, []);

  const handleOpenCrudPopup = (menuId) => {
    setSelectedMenuId(menuId);
    setCrudPopupOpen(true);
  }

  const handleCloseCrudPopup = () => {
    setCrudPopupOpen(false);
    setSelectedMenuId(null);
  }

  const handleDeleteMenu = (menuId) => {
    // Gérer la suppression du menu ici en fonction de son ID
    console.log("Supprimer le menu avec l'ID :", menuId);
  }

  return (
    <>
      <section>
        {authUser ? (
          <>
            <Navigation active={active} setActive={setActive} />

            <div id='categorie' style={{ display: active === 'categorie' ? 'block' : 'none' }}>
              <Categorie />
            </div>

            <div id='menu' style={{ display: active === 'menu' ? 'block' : 'none' }}>
              <Liste onOpenCrudPopup={handleOpenCrudPopup} />
              {crudPopupOpen && (
                <Crud
                  menuId={selectedMenuId}
                  onCloseCrudPopup={handleCloseCrudPopup}
                  onDeleteMenu={handleDeleteMenu}
                />
              )}
            </div>
          </>
        ) : (
          <>
            Demander de se connecter
          </>
        )}
      </section>
    </>
  )
};

export default Administration;


