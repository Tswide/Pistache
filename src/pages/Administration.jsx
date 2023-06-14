import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { auth } from '../Firebase';

import Crud from '../components/Admin/Crud';

const Administration = () => {
  //verification a la connexion
  const [authUser, setAuthUser] = useState(null);
  
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
             <div id="dashboard">
              <section id='liste'>
              </section>
              <section id='edition'>
                <Crud />
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
