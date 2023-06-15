import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { auth } from '../Firebase';

import Navigation from '../components/Admin/Navigation';
import Categorie from '../components/Admin/Categorie';
import Liste from '../components/Admin/Liste';
import Crud from '../components/Admin/Crud';

const Administration = () => {
  //verification a la connexion
  const [authUser, setAuthUser] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isCrudVisible, setIsCrudVisible] = useState(false);
  const [active, setActive] = useState('categorie');

  const handleEdit = (menu) => {
    setSelectedMenu(menu);
    setIsCrudVisible(true);
  };

  const handleCancelEdit = () => {
    setSelectedMenu(null);
    setIsCrudVisible(false);
  };

  // Verificaiton si l'admin est connecter ou non
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

  return (
    <>
      <section>
        {authUser 
          ? 
            <>
              <Navigation active={active} setActive={setActive} />

              <div id='categorie' style={{ display: active === 'categorie' ? 'block' : 'none' }}>
                <Categorie />
              </div>

              <div id='menu' style={{ display: active === 'menu' ? 'block' : 'none' }}>
                <Liste handleEdit={handleEdit} />
                {isCrudVisible && (
                  <div>
                    <Crud 
                      selectedMenu={selectedMenu} 
                      setSelectedMenu={setSelectedMenu} 
                      handleCancelEdit={handleCancelEdit} 
                    />
                  </div>
                )}              
              </div>
            </>
          : 
            <>
              Demander de se connecter
            </>
        } 
      </section>
    </>
  )
};

export default Administration
