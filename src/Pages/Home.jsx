import React, { createContext } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Herosection from '../Components/HeroSection/Herosection'
import Testmonials from '../Components/Testimonial/Testimonial'
import Login from '../Components/Login/Login'
import { FixhealthContext } from '../Context'
import { useContext } from 'react'
import Doctor from '../Components/Doctor/Doctor'
import Sales from '../Components/Sales/Sales'
import Customer from '../Components/Customer/Customer'

export default function Home() {
    const {usertype,showlogin}=useContext(FixhealthContext);

const getcomponenet=()=>{
    switch(usertype)
    {
        case 'customer':
          
          return  (<Customer/>);
                      
        case 'doctor':
            return  <Doctor/>
            
        case 'salesperson':
            return  <Sales/>
            
        default:
                   return  <Herosection/>
    }
}


  return (
    <>
       <Navbar/>

       {showlogin?(<Login/>):(getcomponenet())}
              
      <Testmonials/>
    </>
  )
}
