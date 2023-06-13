import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../Firebase"
import { useNavigate } from "react-router-dom";


const Formulaire_Connexion = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const signIn = (event) => {
      event.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential)
          navigate("/administration")
        })
        .catch((error) => {
          console.log(error);
        })
    }
  
    return (
      <div id="connexion_formulaire">
        <form onSubmit={signIn}>
          <h1>Formulaire de connexion</h1>

          <div className="contact__form-div">
            <label className="contact__form-tag">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='...'
              className="contact__form-input"
            />
          </div>

          <div className="contact__form-div">
            <label className="contact__form-tag">Mot de passe</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='...'
              className="contact__form-input"
            />
          </div> 
          
          <button type="submit">Connexion</button>
        </form>
      </div>
    )
}

export default Formulaire_Connexion
