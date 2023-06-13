import React from 'react'
import Contenue from '../components/Accueil/Accueil'
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
