import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './Pages/Home'
import './App.css'



function App() {
  

  return (
    <>

<Routes>
        <Route path="/" element={ <Home/> } />
        {/* <Route path="about" element={ <About/> } />
        <Route path="contact" element={ <Contact/> } /> */}
      </Routes>

      
    </>
  )
}

export default App
