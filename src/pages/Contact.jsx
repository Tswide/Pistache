import React from 'react'
import Information from '../components/Contact/Information'
import Map from '../components/Contact/Map'

import '../css/contact.css'
import 'mapbox-gl/dist/mapbox-gl.css';

const Contact = () => {
  return (
    <main id='contact'>
      <Information />
      <Map />
    </main>
  )
}

export default Contact
