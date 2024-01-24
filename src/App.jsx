import { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Herosection from './Components/HeroSection/Herosection'

import './App.css'
import Testmonials from './Components/Testimonial/Testimonial'

function App() {
  

  return (
    <>
      <Navbar/>
      <Herosection/>
      <Testmonials/>
    </>
  )
}

export default App
