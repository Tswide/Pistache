import React from 'react'
import Contenue from '../components/Accueil/Accueil'
import Plat from '../assets/italy-gbc76120a5_1280-removebg-preview 1.png'
import Decoration from '../assets/Component 3.svg'

import '../css/accueil.css'

const Accueil = () => {
  return (
    <>
    <main id='accueil'>
      <Contenue />
    </main>
    <img id='deco' src={Decoration} />
    </>
  )
}

export default Accueil
