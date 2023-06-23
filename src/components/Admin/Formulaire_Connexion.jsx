import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Formulaire_Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = (event) => {
    event.preventDefault();

    // Appel de l'API de connexion en utilisant la méthode POST
    fetch('./api/connexion.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log(data.message);
          navigate("/administration");
        } else {
          console.log(data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

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
            placeholder="..."
            className="contact__form-input"
          />
        </div>

        <div className="contact__form-div">
          <label className="contact__form-tag">Mot de passe</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="..."
            className="contact__form-input"
          />
        </div> 
        
        <button type="submit">Connexion</button>
      </form>
    </div>
  );
};

export default Formulaire_Connexion;
