import React from 'react'
import Plats from '../../assets/Rectangle 2.jpg'
import Decoration_nom from '../../assets/Vector 4.svg'

import './card.css'

const Card = () => {
  return(
    <section id='card'>
       <div className='card__flip'>
        <div className='card__plat'>
          <div className='card__front'>
            <img className='img__card' src={Plats} alt="Plats" /> 
          </div>
          <div className='card__back'>
            <div id='groupe__decoration_titre'>
              <h2 id='titre__plat_back'>Le nom du plat</h2>
              <img id='deco__titre_back' src={Decoration_nom} alt="decoration sur le nom du plat" />
            </div>
            <p id='description__plat_back'>Lorem ipsum dolor sit amet, consecte adipiscing elit. Fusce tristique, ligula etricies rutrum, est libero sagittis orci, gravida porttitor.</p>
            <p id='prix__plat_back'>35€</p>
          </div>
        </div>
      </div>
      <div className='card__flip'>
        <div className='card__plat'>
          <div className='card__front'>
            <img className='img__card' src={Plats} alt="Plats" /> 
          </div>
          <div className='card__back'>
            <div id='groupe__decoration_titre'>
              <h2 id='titre__plat_back'>Le nom du plat</h2>
              <img id='deco__titre_back' src={Decoration_nom} alt="decoration sur le nom du plat" />
            </div>
            <p id='description__plat_back'>Lorem ipsum dolor sit amet, consecte adipiscing elit. Fusce tristique, ligula etricies rutrum, est libero sagittis orci, gravida porttitor.</p>
            <p id='prix__plat_back'>35€</p>
          </div>
        </div>
      </div>
      <div className='card__flip'>
        <div className='card__plat'>
          <div className='card__front'>
            <img className='img__card' src={Plats} alt="Plats" /> 
          </div>
          <div className='card__back'>
            <div id='groupe__decoration_titre'>
              <h2 id='titre__plat_back'>Le nom du plat</h2>
              <img id='deco__titre_back' src={Decoration_nom} alt="decoration sur le nom du plat" />
            </div>
            <p id='description__plat_back'>Lorem ipsum dolor sit amet, consecte adipiscing elit. Fusce tristique, ligula etricies rutrum, est libero sagittis orci, gravida porttitor.</p>
            <p id='prix__plat_back'>35€</p>
          </div>
        </div>
      </div> 
      <div className='card__flip'>
        <div className='card__plat'>
          <div className='card__front'>
            <img className='img__card' src={Plats} alt="Plats" /> 
          </div>
          <div className='card__back'>
            <div id='groupe__decoration_titre'>
              <h2 id='titre__plat_back'>Le nom du plat</h2>
              <img id='deco__titre_back' src={Decoration_nom} alt="decoration sur le nom du plat" />
            </div>
            <p id='description__plat_back'>Lorem ipsum dolor sit amet, consecte adipiscing elit. Fusce tristique, ligula etricies rutrum, est libero sagittis orci, gravida porttitor.</p>
            <p id='prix__plat_back'>35€</p>
          </div>
        </div>
      </div>  
    </section>
  )
}

export default Card
