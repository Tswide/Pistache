import React from 'react'
import Photos from '../../assets/Rectangle 2.jpg'

import './information.css'

const Information = () => {
  return (
    <section id='informations'>
      <div id='informations__restaurent_information'>
        <p>Information</p>    
      </div>
      <img id='photo__restaurent_information' src={Photos} alt="Photos du restaurent" />
    </section>
  )
}

export default Information
