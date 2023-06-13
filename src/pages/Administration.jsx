import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { auth, db } from '../Firebase';
import { uid } from 'uid';
import {set, ref} from 'firebase/database';

const Administration = () => {
  //verification a la connexion
  const [authUser, setAuthUser] = useState(null);
  
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

  //ecrire dans la db
  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(db, `/${uuid}`), {
      imageMenu,
      titreMenu,
      contenueMenu,
      uuid,
    });

    setImageMenu("");
    setTitreMenu("");
    setContenueMenu("");
  }

  return (
    <>
      <section>
        {authUser 
          ? 
            <>
             <div id="dashboard">
              <section id='liste'>
                
              </section>
              <section id='edition'>
                <input type="file" accept='image/png, image/jpeg' name="image" value={imageMenu} onChange={handleImageChange} />
                <input type="text" name="titre" value={titreMenu} onChange={handleTitreMenu} />
                <input type="text" name="contenue" value={contenueMenu} onChange={handleContenueMenu} />
                <button onClick={writeToDatabase}>Envoyer</button>
              </section>
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
